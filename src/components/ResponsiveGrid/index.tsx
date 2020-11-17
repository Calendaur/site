import { PropsWithChildren, DetailedHTMLProps, HTMLAttributes } from 'react'
import cx from 'classnames'

import styles from './styles.module.css'

interface Props {
  className?: string
  minTileWidth?: number
}

function ResponsiveGrid({
  className,
  children,
  minTileWidth = 288,
  ...rest
}: PropsWithChildren<
  Props & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>) {
  return (
    <div
      className={cx(styles.Grid, className)}
      {...rest}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${minTileWidth}px, 1fr))`,
      }}
    >
      {children}
    </div>
  )
}

export default ResponsiveGrid
