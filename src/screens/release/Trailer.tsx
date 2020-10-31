import { getYoutubeId } from 'shared/utils'

import styles from './styles.module.css'

function Trailer({ url }) {
  return (
    <div className={styles.Trailer} id="trailer">
      <div className="aspectRatio">
        <iframe
          title="Trailer"
          frameBorder="0"
          className="lazyload"
          allowFullScreen
          width="100%"
          height="100%"
          data-src={`https://www.youtube.com/embed/${getYoutubeId(url)}`}
        />
      </div>
    </div>
  )
}

export default Trailer
