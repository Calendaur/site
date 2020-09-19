import React from 'react'
import { useAmp } from 'next/amp'
import { IMG_PLACEHOLDER } from 'shared/constants'

function Image({ lazy = true, src, alt = '' }) {
  const isAmp = useAmp()

  if (isAmp) {
    return <amp-img src={src} alt={alt} layout="fill" />
  }

  if (lazy) {
    return (
      <img
        loading="lazy"
        className="lazyload"
        src={IMG_PLACEHOLDER}
        data-src={src}
        alt={alt}
      />
    )
  }

  return <img loading="lazy" src={src} alt={alt} />
}

export default Image
