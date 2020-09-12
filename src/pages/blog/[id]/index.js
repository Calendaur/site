import React from 'react'
import { Post } from 'screens/blog'
import * as api from 'shared/api'

function PostPage({ post }) {
  return <Post post={post} />
}

PostPage.getInitialProps = async ctx => {
  if (!ctx.query.id) {
    return { error: 404 }
  }

  try {
    const { post } = await api.post(ctx.query.id)

    return {
      post,
    }
  } catch (e) {
    console.error(e)

    return { error: 500 }
  }
}

export default PostPage
