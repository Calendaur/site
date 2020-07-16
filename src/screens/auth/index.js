import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Button, Input } from '../../components'
import { api } from '../../core/api'

import styles from './styles.module.css'

function Auth() {
  const [code, setCode] = useState(false)

  const { handleSubmit, handleChange, handleBlur, values } = useFormik({
    initialValues: {
      email: '',
      code: '',
    },
    onSubmit: async values => {
      if (!values.code) {
        const { success } = await api.auth(values.email)

        if (success) {
          setCode(true)
          return
        }
      } else {
        await api.confirmAuthCode(values.email, values.code)
      }
    },
  })

  return (
    <section className={styles.Section}>
      <h1 className={styles.Title}>Войти</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <Button
            isFullWidth
            isPrimary
            type="button"
            className={styles.GoogleOAuth}
          >
            Войти через Google
          </Button>
          {code ? (
            <>
              <Input
                id="code"
                label="Код"
                type="tel"
                name="code"
                value={values.code}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="1234"
                className={styles.Input}
              />
              <Button isFullWidth isPrimary type="submit">
                Подтвердить
              </Button>
            </>
          ) : (
            <>
              <Input
                id="email"
                label="Email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="name@example.com"
                className={styles.Input}
              />
              <Button isFullWidth isPrimary type="submit">
                Войти через почту
              </Button>
            </>
          )}
        </form>
      </div>
    </section>
  )
}

export default Auth
