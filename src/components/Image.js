import React from 'react'

function Image({ lazy = true, src, alt = '' }) {
  if (lazy) {
    return (
      <img
        loading="lazy"
        className="lazyload"
        src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
        data-src={src}
        alt={alt}
      />
    )
  }

  return <img loading="lazy" src={src} alt={alt} />
}

export default Image
