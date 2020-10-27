import Head from 'next/head'
import { useRouter } from 'next/router'

interface Props {
  meta: {
    description: string
    title: string
  }
}

function Meta({ meta }: Props) {
  const { asPath } = useRouter()
  const fullURL =
    asPath === '/' ? 'https://released.at' : `https://released.at${asPath}`

  return (
    <Head>
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullURL} />
      <meta property="twitter:url" content={fullURL} />
      <meta name="title" content={meta.title} />
      <meta name="description" content={meta.description} />
      <meta property="og:site_name" content={meta.title} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta
        property="og:image"
        content="https://released.at/images/banner.jpg"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:text:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta
        name="twitter:image:src"
        content="https://released.at/images/banner.jpg"
      />
      <link rel="image_src" href="https://released.at/images/banner.jpg" />
      <title>{meta.title}</title>
    </Head>
  )
}

export default Meta
