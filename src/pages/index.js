import { checkFixRedirect } from '../core/url'

function IndexPage() {
  return null
}

IndexPage.getInitialProps = ctx => {
  checkFixRedirect(ctx)

  return {
    props: {},
  }
}

export default IndexPage
