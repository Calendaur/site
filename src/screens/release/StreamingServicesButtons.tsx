import cx from 'classnames'
import { Button } from 'components'
import { sendEvent } from 'shared/analytics'
import { StreamingService } from 'types/common'

import styles from './styles.module.css'

interface Props {
  services: StreamingService[]
}

function StreamingServicesButtons({ services }: Props) {
  return (
    <div className={styles.StreamingServicesButtons}>
      <p>Где смотреть:</p>
      <div className={styles.Services}>
        {services.map(service => (
          <Button
            key={service.type}
            className={cx(styles.ServiceButton, styles[service.type])}
            onClick={() => {
              window.open(service.link, '_blank')
              sendEvent(service.event)
            }}
          >
            <img src={service.icon} alt={service.title} />
          </Button>
        ))}
      </div>
    </div>
  )
}

export default StreamingServicesButtons
