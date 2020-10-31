import React from 'react'
import slugify from '@sindresorhus/slugify'
import { A } from 'components'
import { routes } from 'shared/constants'

function PostCard({ title, id, created_at }) {
  const slug = slugify(title)

  return (
    <A href="/blog/[id]" as={routes.BLOG_POST(`${id}-${slug}`)}>
      <h2>{title}</h2>
    </A>
  )
}

export default PostCard
