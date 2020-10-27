import  { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { AuthForm } from 'components'
import { useUser } from 'features/user/use-user'
import { routes } from 'shared/constants'

function SignInPage() {
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
        <title>Войти в аккаунт Released</title>
      </Head>
      <AuthForm buttonTitle="Войти" type="login" />
    </>
  )
}

export default SignInPage
