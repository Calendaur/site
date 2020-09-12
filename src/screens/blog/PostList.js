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
  return (
    <>
      <Head>
        <title>Блог Released</title>
      </Head>
      <Grid>
        {posts.map(post => (
          <PostCard key={post.id} {...post} />
        ))}
      </Grid>
    </>
  )
}

export default PostList
