import React from 'react'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import slugify from '@sindresorhus/slugify'
import { A } from 'components'
import { routes } from 'shared/constants'

function PostCard({ title, id, updated_at }) {
  const slug = slugify(title)

  return (
    <A href="/blog/[id]" as={routes.BLOG_POST(`${id}-${slug}`)}>
      <h2>{title}</h2>
      <p>{format(new Date(updated_at), 'd MMMM', { locale: ru })}</p>
    </A>
  )
}

export default PostCard
