import { Fragment } from 'react'
import Link, { LinkProps } from 'next/link'
import cx from 'classnames'

import styles from './styles.module.css'

type LinkPropsWithExtra = LinkProps & {
  title: string
}

interface Props {
  links: LinkPropsWithExtra[]
  className?: string
}

function Breadcrumbs({ links, className }: Props) {
  function isLast(index: number) {
    return index === links.length - 1
  }

  return (
    <nav className={cx(styles.Breadcrumbs, className)} aria-label="breadcrumbs">
      {links.map(({ title, ...linkProps }, index) => {
        const last = isLast(index)

        return (
          <Fragment key={title}>
            {last ? (
              <p aria-current="page">{title}</p>
            ) : (
              <Link {...linkProps}>
                <a>{title}</a>
              </Link>
            )}
            {last ? null : <span className={styles.Separator}>/</span>}
          </Fragment>
        )
      })}
    </nav>
  )
}

export default Breadcrumbs
