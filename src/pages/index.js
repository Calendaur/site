import { redirect, checkAndCorrectURL } from '../lib'

function IndexPage() {
  return null
}

IndexPage.getInitialProps = ctx => {
  redirect(ctx, checkAndCorrectURL(ctx.asPath).url)
}

export default IndexPage
