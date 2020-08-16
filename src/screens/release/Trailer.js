import React, { useMemo } from 'react'
import getYouTubeId from 'get-youtube-id'

import styles from './styles.module.css'

function Trailer({ url }) {
  const src = useMemo(
    () => `https://www.youtube.com/embed/${getYouTubeId(url)}`,
    [url],
  )

  return (
    <div id="trailer" className={styles.Trailer}>
      <div className={styles.aspectRatio}>
        <iframe
          title="Trailer"
          frameBorder="0"
          className="lazyload"
          allowFullScreen
          width="100%"
          height="100%"
          data-src={src}
        />
      </div>
    </div>
  )
}

export default Trailer
