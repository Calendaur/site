import React from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import PostCard from './PostCard'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
  grid-gap: 16px;

  a {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    height: 320px;
    padding: 24px;
    border-radius: 4px;
    transition: var(--animation-time);

    &:hover {
      transform: translate(0, -4px);
    }

    &:active {
      transform: translate(0, 0);
    }

    h2 {
      font-size: 25px;
      font-weight: bold;
      line-height: 29px;
      color: var(--black-color);
      letter-spacing: -0.6px;
    }

    p {
      margin: 0;
      color: var(--black-color);
    }

    &:nth-child(n) {
      background-color: #f1c5c5;
    }

    &:nth-child(2n) {
      background-color: #d2f6c5;
    }

    &:nth-child(3n) {
      background-color: #d6e0f0;
    }

    &:nth-child(4n) {
      background-color: #f1f3de;
    }

    &:nth-child(5n) {
      background-color: #cffffe;
    }
  }
`

function PostList({ posts }) {
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
      <h1>Блог</h1>
      <p>
        Новости из&nbsp;мира игр, кино и&nbsp;сериалов. А&nbsp;также подборки,
        обзоры и&nbsp;рецензии{' '}
        <span role="img" aria-label="writing-hand">
          ✍️
        </span>
      </p>
      <Grid>
        {posts.map(post => (
          <PostCard key={post.id} {...post} />
        ))}
      </Grid>
    </>
  )
}

export default PostList
