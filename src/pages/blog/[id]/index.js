import React from 'react'
import Post from 'screens/blog/Post'
import * as api from 'shared/api'

function PostPage({ post }) {
  return <Post post={post} />
}

export async function getServerSideProps(context) {
  const { post } = await api.post(context.query.id)

  return {
    props: {
      post,
    },
  }
}

export default PostPage
