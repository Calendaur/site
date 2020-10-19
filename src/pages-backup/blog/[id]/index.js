import React from 'react'
import slugify from '@sindresorhus/slugify'
import Post from 'screens/blog/Post'
import * as api from 'shared/api'
import { redirect } from 'shared/utils'
import { routes } from 'shared/constants'

function PostPage({ post }) {
  return <Post post={post} />
}

export async function getServerSideProps(context) {
  const idWithSlug = context.query.id
  const { post } = await api.post(idWithSlug)

  if (idWithSlug.split('-').length === 1) {
    redirect(context, routes.BLOG_POST(`${idWithSlug}-${slugify(post.title)}`))
  }

  return {
    props: {
      post,
    },
  }
}

export default PostPage
