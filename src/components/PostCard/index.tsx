import Link from 'next/link'
import Image from 'next/image'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import slugify from '@sindresorhus/slugify'
import { Title } from 'components'
import { routes } from 'shared/constants'
import { BlogArticleInList } from 'types/common'

import styles from './styles.module.css'

function PostCard({ title, cover, id, created_at }: BlogArticleInList) {
  const slug = slugify(title)
  const date = new Date(created_at * 1000)

  return (
    <Link href={routes.BLOG_POST(`${id}-${slug}`)}>
      <a className={styles.PostCard}>
        {cover && (
          <div className={styles.Cover}>
            <Image src={cover} unsized />
          </div>
        )}
        <div className={styles.Footer}>
          <Title h3>{title}</Title>
          <p>{format(date, 'd MMMM yyyy', { locale: ru })}</p>
        </div>
      </a>
    </Link>
  )
}

export default PostCard
