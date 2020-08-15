import React, { useMemo } from 'react'

function Image({ src, alt }) {
  const path = useMemo(() => new URL(src).pathname, [src])

  return (
    <img
      loading="lazy"
      className="lazyload"
      src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
      data-src={path}
      alt={alt}
    />
  )
}

export default Image
