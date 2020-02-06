import { redirect, checkAndCorrectURL } from '../../lib'

function TypePage() {
  return null
}

TypePage.getInitialProps = ctx => {
  redirect(ctx, checkAndCorrectURL(ctx.asPath).url)

  return {}
}

export default TypePage
