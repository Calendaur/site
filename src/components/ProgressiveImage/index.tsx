import { memo, ReactElement, useMemo, useState } from 'react'
import Image from 'next/image'
import cx from 'classnames'

import styles from './styles.module.css'

type ImageProps = {
  src: string
  width?: number | string
  height?: number | string
  alt?: string
}

const isNumber = (value: unknown): boolean => typeof value === 'number'

const ProgressiveImageRender = ({
  src,
  height,
  width,
  alt,
}: ImageProps): ReactElement => {
  const [isLoaded, setLoaded] = useState<boolean>(false)
  const [isBlurLoaded, setBlurLoaded] = useState<boolean>(false)

  const blurDimensions = useMemo(() => {
    const _w: number = isNumber(width) ? +width / 30 : 5
    const _h: number = isNumber(height) ? +height / 30 : 5

    return { width: _w, height: _h }
  }, [width, height])

  const wrapperStyles = useMemo(
    () => ({
      width,
      height,
      minHeight: height,
    }),
    [width, height],
  )

  return (
    <div style={wrapperStyles} className={styles.container}>
      <Image
        src={src}
        layout="fixed"
        quality={1}
        className={cx(styles.blur, { [styles.hidden]: !isBlurLoaded })}
        alt={`blur_${src}`}
        onLoad={() => setBlurLoaded(true)}
        {...blurDimensions}
      />
      <Image
        src={src}
        layout="fill"
        quality={100}
        onLoad={() => setLoaded(true)}
        className={cx({ [styles.hidden]: !isLoaded })}
        alt={alt}
      />
    </div>
  )
}

export default memo(ProgressiveImageRender)
