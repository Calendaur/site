import React, { HTMLAttributes } from 'react'
import { useAmp } from 'next/amp'
import { IMG_PLACEHOLDER } from 'shared/constants'

interface Props {
  lazy?: boolean
  src: string
  alt?: string
  width?: string
  height?: string
}

function Image({
  lazy = true,
  src,
  alt = '',
  ...rest
}: Props & HTMLAttributes<HTMLImageElement>) {
  const isAmp = useAmp()

  if (isAmp) {
    return <amp-img src={src} alt={alt} layout="fill" {...rest} />
  }

  if (lazy) {
    return (
      <img
        loading="lazy"
        className="lazyload"
        src={IMG_PLACEHOLDER}
        data-src={src}
        alt={alt}
        {...rest}
      />
    )
  }

  return <img loading="lazy" src={src} alt={alt} {...rest} />
}

export default Image
