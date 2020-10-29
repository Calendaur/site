import Head from 'next/head'
import { TitleWithDescription, Title, Text, PostsGrid } from 'components-css'
import { BlogArticleInList } from 'types/common'

interface Props {
  posts: BlogArticleInList[]
}

function PostList({ posts }: Props) {
  const title =
    'Блог released.at. Новости игр, кино и сериалов. Обзоры и рецензии'
  const description =
    'В нашем блоге вы узнаете, что посмотреть или во что поиграть в текущем месяце, а также новости, обзоры и рецензии'

  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://released.at/blog" />
        <meta property="twitter:url" content="https://released.at/blog" />
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:site_name" content={title} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://released.at/images/banner.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:text:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image:src"
          content="https://released.at/images/banner.jpg"
        />
        <link rel="image_src" href="https://released.at/images/banner.jpg" />
        <title>{title}</title>
      </Head>
      <TitleWithDescription>
        <Title>Блог</Title>
        <Text>
          Новости из&nbsp;мира игр, кино и&nbsp;сериалов. А&nbsp;также подборки,
          обзоры и&nbsp;рецензии{' '}
          <span role="img" aria-label="writing-hand">
            ✍️
          </span>
          .<br />
          Также у&nbsp;нас есть профиль в&nbsp;
          <a
            href="https://zen.yandex.ru/id/5f702b5d243429689bde2890"
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{
              textDecoration: 'underline',
            }}
          >
            Яндекс.Дзен
          </a>{' '}
          и&nbsp;
          <a
            href="https://t.me/released_at"
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{
              textDecoration: 'underline',
            }}
          >
            Телеграм канал
          </a>
          . Подпишитесь на&nbsp;нас там, это поможет проекту получить новую
          аудиторию.
        </Text>
      </TitleWithDescription>
      <PostsGrid posts={posts} />
    </>
  )
}

export default PostList
