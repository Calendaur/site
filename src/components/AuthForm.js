import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { useFormik } from 'formik'
import Cookies from 'js-cookie'
import { sendConfirmCode, confirm } from 'core/api'
import { routes } from 'shared/constants'
import Button from './Button'
import Input from './Input'
import A from './A'

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

function AuthForm({ buttonTitle, type }) {
  const [currentField, setCurrentField] = useState(FIELDS.EMAIL)
  const [error, setError] = useState(null)
  const { push } = useRouter()

  function clearError() {
    if (error) setError(null)
  }

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
      let errors = {}

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
            const { token } = await confirm(values.email, values.code)
            Cookies.set('authorization', token, { expires: 365 })
            push(routes.ME)
          } catch (e) {
            console.error(e)
            setError(e.message)
          } finally {
            break
          }
        }
      }
    },
  })

  return (
    <>
      <Cover>
        <img src={POSTERS[getRandomNum()]} alt="" />
      </Cover>
      <Center>
        <Form onSubmit={handleSubmit}>
          {type === 'registration' ? (
            <p>
              Мы&nbsp;не&nbsp;храним ваши пароли ни&nbsp;в&nbsp;каком виде
              из&nbsp; соображений безопасности. Поэтому для регистрации просто
              введите ваш email, на&nbsp;который придет короткий одноразовый
              код. Введя его, вы&nbsp;попадёте в&nbsp;личный кабинет.
              <br />
              Уже есть аккаунт? <A href={routes.SIGN_IN}>Войдите</A>
            </p>
          ) : (
            <p>
              Нет аккаунта? <A href={routes.SIGN_UP}>Создайте</A>
            </p>
          )}
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
          <Button fullWidth primary type="submit">
            {currentField === FIELDS.EMAIL && buttonTitle}
            {currentField === FIELDS.CODE && 'Подтвердить'}
          </Button>
          {error && <Error>{error}</Error>}
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
  opacity: 0.05;
  pointer-events: none;

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

const Error = styled.p``

export default AuthForm
