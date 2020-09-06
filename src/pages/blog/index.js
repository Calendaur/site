import React from 'react'
import { PostList } from 'screens/blog'
import * as api from 'shared/api'

function BlogPage(props) {
  return <PostList {...props} />
}

export async function getServerSideProps() {
  try {
    const { posts } = await api.posts()

    return {
      props: {
        posts,
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

export default BlogPage
