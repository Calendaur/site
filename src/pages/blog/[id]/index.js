import React from 'react'
import { Post } from 'screens/blog'
import * as api from 'shared/api'

function PostPage({ post }) {
  return <Post post={post} />
}

export async function getServerSideProps(ctx) {
  try {
    const { post } = await api.post(ctx.query.id)

    return {
      props: {
        post,
        error: false,
      },
    }
  } catch (e) {
    console.error(e)
    return {
      props: {
        error: true,
      },
    }
  }
}

export default PostPage
