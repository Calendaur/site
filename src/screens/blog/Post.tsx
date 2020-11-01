import Head from 'next/head'
import Link from 'next/link'
import slugify from '@sindresorhus/slugify'
import Md from 'react-markdown'
import { Title } from 'components'
import { getYoutubeId } from 'shared/utils'
import { BlogArticleWithDetails } from 'types/common'

import styles from './styles.module.css'

interface Props {
  post: BlogArticleWithDetails
}

function Post({ post }: Props) {
  const slug = slugify(post.title)
  const metaTitle = `${post.title}. Читать на Released`
  const url = `https://released.at/blog/${post.id}-${slug}`
  const description = `Статьи на Released. Самая свежая и интересная информация из мира кино, игр и сериалах: новости, подборки, переносы, обзоры премьер.`

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="title" content={metaTitle} />
        <meta name="description" content={description} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={metaTitle} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={description} />
        <meta property="og:image" content={post.cover} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:src" content={post.cover} />
        <link rel="image_src" href={post.cover} />
      </Head>
      <div>
        <div className={styles.PageWrapper}>
          <Title>{post.title}</Title>
          <article className={styles.Markdown}>
            <Md
              source={post.body}
              renderers={{
                paragraph: ({ children }) => {
                  return (
                    <div role="paragraph" className={styles.p}>
                      {children}
                    </div>
                  )
                },
                link: ({ href, children }) => {
                  if (href.includes('youtube.com')) {
                    return (
                      <div className={styles.aspectRatio}>
                        <iframe
                          title="Trailer"
                          frameBorder="0"
                          className="lazyload"
                          allowFullScreen
                          width="100%"
                          height="100%"
                          data-src={`https://www.youtube.com/embed/${getYoutubeId(
                            href,
                          )}`}
                        />
                      </div>
                    )
                  }

                  if (href.includes('released.at/release')) {
                    const { pathname } = new URL(href)

                    return (
                      <Link href="/release/[id]" as={pathname}>
                        <a target="_blank">{children}</a>
                      </Link>
                    )
                  }

                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                    >
                      {children}
                    </a>
                  )
                },
              }}
            />
          </article>
        </div>
      </div>
    </>
  )
}

export default Post
