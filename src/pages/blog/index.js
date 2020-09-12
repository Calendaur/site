import React from 'react'
import { PostList } from 'screens/blog'
import * as api from 'shared/api'

function BlogPage({ posts }) {
  return <PostList posts={posts} />
}

BlogPage.getInitialProps = async () => {
  try {
    const { posts } = await api.posts()

    return {
      posts,
    }
  } catch (e) {
    console.error(e)

    return { error: 500 }
  }
}

export default BlogPage
