import React, { useState, useContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { useFormik } from 'formik'
import { Button, Input } from 'components'
import { StoreContext } from 'core/store'
import { sendConfirmCode, confirm } from 'core/api'

const Section = styled.section`
  max-width: 560px;
  margin: 0 auto;
`

const Title = styled.h1`
  margin-bottom: var(--vertical-2);
`

const Field = styled(Input)`
  margin-bottom: var(--vertical-4);
`

function Auth() {
  const [code, setCode] = useState(false)
  const { push } = useRouter()
  const { dispatch } = useContext(StoreContext)

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      email: '',
      code: '',
    },
    validate: values => {
      let errors = {}

      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Некорректный email'
      }

      return errors
    },
    onSubmit: async values => {
      if (!values.code) {
        await sendConfirmCode(values.email)
        setCode(true)
      } else {
        const { current_user } = await confirm(values.email, values.code)
        dispatch({ type: 'me/set', payload: current_user })
        push('/me')
      }
    },
    validateOnBlur: false,
  })

  return (
    <>
      <Head>
        <title>Авторизация</title>
      </Head>
      <Section>
        <Title>Войти</Title>
        <div>
          <form onSubmit={handleSubmit}>
            {code ? (
              <>
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
                <Button fullWidth primary type="submit">
                  Подтвердить
                </Button>
              </>
            ) : (
              <>
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
                <Button fullWidth primary type="submit">
                  Войти через почту
                </Button>
              </>
            )}
          </form>
        </div>
      </Section>
    </>
  )
}

export default Auth
