import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useMutation, useQueryCache } from 'react-query'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { useFormik } from 'formik'
import addMinutes from 'date-fns/addMinutes'
import addHours from 'date-fns/addHours'
import Cookies from 'js-cookie'
import { sendConfirmCode, confirm, me } from 'shared/api'
import { routes, cookies, endpoints } from 'shared/constants'
import Input from './Input'
import A from './A'

const Button = dynamic(() => import('./Button'), { ssr: false }) // Because incorrect cantAuth state...

const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

const VALIDATE_ERRORS = {
  EMAIL: 'Некорректный email',
  CODE: 'Код должен содержать 4 символа',
}

const FIELDS = {
  EMAIL: 'email',
  CODE: 'code',
}

const INITIAL_VALUES = {
  email: '',
  code: '',
}

function getRandomNum() {
  const min = 0
  const max = 2
  return Math.floor(Math.random() * (max + 1 - min)) + min
}

const POSTERS = [
  '/images/cyberpunk-2077.jpg',
  '/images/tenet.jpg',
  '/images/dark.jpg',
]

const MAX_ATTEMPS = 10

const POSTER_IMG = POSTERS[getRandomNum()]

function AuthText({ type, codeWasSended, email }) {
  if (codeWasSended) {
    return (
      <p>
        На&nbsp;почту <A href="">{email}</A> был выслан 4-х значный код
        необходимый для авторизации. Если код не&nbsp;пришёл в&nbsp;течение
        минуты, проверьте введенный email адрес, возможно в&nbsp;нём была
        допущена ошибка. Если email введен правильно, а&nbsp;код так
        и&nbsp;не&nbsp;пришел, то&nbsp;напишите нам на&nbsp;почту{' '}
        <A href="mailto:support@released.at">support@released.at</A>
      </p>
    )
  }

  if (type === 'registration') {
    return (
      <p>
        Мы&nbsp;не&nbsp;храним ваши пароли ни&nbsp;в&nbsp;каком виде
        из&nbsp;соображений безопасности. Поэтому для регистрации просто введите
        ваш email, на&nbsp;который придет короткий одноразовый код. Введя его,
        вы&nbsp;попадёте в&nbsp;личный кабинет.
        <br />
        Уже есть аккаунт? <A href={routes.SIGN_IN}>Войдите</A>
      </p>
    )
  }

  return (
    <p>
      Нет аккаунта? <A href={routes.SIGN_UP}>Создайте</A>
    </p>
  )
}

function AuthForm({ buttonTitle, type }) {
  const queryCache = useQueryCache()
  const [currentField, setCurrentField] = useState(FIELDS.EMAIL)
  const [authAttemtps] = useState<number>(
    +Cookies.get(cookies.AUTH_ATTEMPTS) || 0,
  )
  const [codeWasSend, setCodeWasSend] = useState<boolean>(
    JSON.parse(Cookies.get(cookies.CODE_HAS_BEEN_SENT) || 'false'),
  )
  const [error, setError] = useState(null)
  const { push } = useRouter()

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (codeWasSend) {
      interval = setInterval(() => {
        const cookie = Cookies.get(cookies.CODE_HAS_BEEN_SENT)

        if (cookie) return

        setCodeWasSend(false)
        Cookies.remove(cookies.CODE_HAS_BEEN_SENT) // For consistent
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [codeWasSend])

  function clearError() {
    if (error) setError(null)
  }

  const [signIn] = useMutation(confirm, {
    onSuccess: async ({ token }) => {
      Cookies.set(cookies.AUTHORIZATION, token, {
        expires: 365,
      })
      const user = await me(token)
      queryCache.setQueryData(endpoints.PROFILE, user)
      Cookies.remove(cookies.AUTH_ATTEMPTS)
      Cookies.remove(cookies.CODE_HAS_BEEN_SENT)
      push(routes.ME)
    },
    throwOnError: true,
  })

  const {
    handleSubmit,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: INITIAL_VALUES,
    validate: values => {
      let errors: {
        email?: string
        code?: string
      } = {}

      if (currentField === FIELDS.EMAIL && !EMAIL_REGEXP.test(values.email)) {
        errors.email = VALIDATE_ERRORS.EMAIL
      }

      if (currentField === FIELDS.CODE && values.code.length !== 4) {
        errors.code = VALIDATE_ERRORS.CODE
      }

      return errors
    },
    onSubmit: async values => {
      switch (currentField) {
        case FIELDS.EMAIL: {
          try {
            await sendConfirmCode(values.email)
            Cookies.set(cookies.AUTH_ATTEMPTS, `${authAttemtps + 1}`, {
              expires: addHours(new Date(), 1),
            })
            Cookies.set(cookies.CODE_HAS_BEEN_SENT, 'true', {
              expires: addMinutes(new Date(), 1),
            })
            clearError()
            setCurrentField(FIELDS.CODE)
          } catch (e) {
            console.error(e)
            setError(e.message)
          } finally {
            break
          }
        }
        case FIELDS.CODE: {
          try {
            await signIn({
              code: values.code,
              email: values.email,
            })
          } catch (e) {
            console.error(e)
            setError(
              e.response.status === 403 ? 'Неверный код' : e.error.message,
            )
          } finally {
            break
          }
        }
      }
    },
  })

  const cantAuth =
    (codeWasSend || authAttemtps >= MAX_ATTEMPS) &&
    currentField === FIELDS.EMAIL

  return (
    <>
      <Cover>
        <img src={POSTER_IMG} alt="" />
      </Cover>
      <Center>
        <Form onSubmit={handleSubmit}>
          <AuthText
            type={type}
            codeWasSended={currentField === FIELDS.CODE}
            email={values.email}
          />
          {currentField === FIELDS.EMAIL && (
            <Field
              id="email"
              label="Email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="name@example.com"
              error={errors.email && touched.email && errors.email}
            />
          )}
          {currentField === FIELDS.CODE && (
            <Field
              id="code"
              label="Код"
              type="tel"
              name="code"
              value={values.code}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="1234"
              maxLength={4}
            />
          )}
          <Button disabled={cantAuth} fullWidth primary type="submit">
            {currentField === FIELDS.EMAIL && buttonTitle}
            {currentField === FIELDS.CODE && 'Подтвердить'}
          </Button>
          {error && <Error>{error}</Error>}
          {codeWasSend && authAttemtps < MAX_ATTEMPS && (
            <Note>
              Код уже был выслан. Повторную отправку можно сделать через минуту
            </Note>
          )}
          {authAttemtps >= MAX_ATTEMPS && (
            <Note>
              Мы&nbsp;заметили, что вы&nbsp;имеете проблемы с&nbsp;авторизацией.
              Повторите попытку через час или напишите нам на&nbsp;почту{' '}
              <A href="mailto:support@released.at">support@released.at</A> для
              решения проблемы
            </Note>
          )}
        </Form>
      </Center>
    </>
  )
}

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const Cover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.05;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    filter: blur(1px);

    @media (min-width: 768px) {
      filter: blur(5px);
    }
  }
`

const Form = styled.form`
  position: relative;
  width: 100%;
  max-width: 560px;
  margin: 0 auto;

  a {
    text-decoration: underline;
  }
`

const Field = styled(Input)`
  margin-bottom: var(--vertical-4);
`

const Error = styled.p`
  position: absolute;
  top: 100%;
  left: 0;
  margin: 12px 0;
  font-size: 16px;
  line-height: 1.5;
  color: #f56b3d;
`

const Note = styled.p`
  position: absolute;
  top: 100%;
  left: 0;
  margin: 12px 0;
  font-size: 16px;
  line-height: 1.5;
`

export default AuthForm
