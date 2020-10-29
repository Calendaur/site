import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { AuthForm } from 'components-css'
import { useUser } from 'features/user/use-user2'
import { routes } from 'shared/constants'

function SignUpPage() {
  const { push } = useRouter()
  const { isLoggedIn } = useUser()

  useEffect(() => {
    if (isLoggedIn) {
      push(routes.ME)
    }
  }, [isLoggedIn]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Head>
        <title>Зарегистрироваться на Released</title>
      </Head>
      <AuthForm buttonTitle="Зарегистрироваться" type="registration" />
    </>
  )
}

export default SignUpPage
