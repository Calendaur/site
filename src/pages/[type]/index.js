import { checkFixRedirect } from '../../core/url'

function TypePage() {
  return null
}

TypePage.getInitialProps = ctx => {
  checkFixRedirect(ctx)

  return {
    props: {},
  }
}

export default TypePage
