import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { mutate } from 'swr'
import { useFormik } from 'formik'
import { Button, Input } from 'components'
import { endpoints } from 'core/api'
import { ME } from 'core/routes'

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

function AuthForm({ buttonTitle }) {
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
    },
    onSubmit: async values => {
      switch (currentField) {
        case FIELDS.EMAIL: {
          try {
            await mutate(values.email)
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
            const { current_user: me } = await mutate(
              endpoints.TOKENS,
              {
                email: values.email,
                otp: values.code,
              },
              false,
            )
            mutate(endpoints.PROFILE, me)
            clearError()
            push(ME)
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
    <form onSubmit={handleSubmit}>
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
    </form>
  )
}

const Field = styled(Input)`
  margin-bottom: var(--vertical-4);
`

const Error = styled.p``

export default AuthForm
