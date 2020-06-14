import React from 'react'
import { TargetBlankA as A } from '../../components'

import styles from './styles.module.css'

function Sharing({ title, url }) {
  return (
    <div className={styles.Sharing}>
      <p>Поделиться релизом:</p>
      <div>
        <A
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`}
        >
          <img src="/icons/facebook.svg" alt="Поделиться через Facebook" />
        </A>
        <A
          href={`https://vk.com/share.php?url=${url}&title=${title}&utm_source=share2`}
        >
          <img src="/icons/vk.svg" alt="Поделиться через VK" />
        </A>
        <A href={`https://twitter.com/intent/tweet/?text=${title}&url=${url}`}>
          <img src="/icons/twitter.svg" alt="Поделиться через Twitter" />
        </A>
        <A href={`tg://msg_url?url=${url}&text=${title}`}>
          <img src="/icons/telegram.svg" alt="Поделиться через Telegram" />
        </A>
      </div>
    </div>
  )
}

export default Sharing
