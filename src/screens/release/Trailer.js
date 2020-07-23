import React from 'react'
import getYouTubeId from 'get-youtube-id'

import styles from './styles.module.css'

function Trailer({ url }) {
  return (
    <div className={styles.Trailer}>
      <div className={styles.aspectRatio}>
        <iframe
          title="Trailer"
          frameBorder="0"
          class="lazyload"
          allowFullScreen
          allowTransparency
          width="100%"
          height="100%"
          data-src={`https://www.youtube.com/embed/${getYouTubeId(url)}`}
        />
      </div>
    </div>
  )
}

export default Trailer
