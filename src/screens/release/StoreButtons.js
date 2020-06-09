import React from 'react'
import { Button } from '../../components'

import styles from './styles.module.css'

const mockButtons = [
  { type: 'ps-store', link: '#' },
  { type: 'gog', link: '#' },
  { type: 'egs', link: '#' },
  { type: 'steam', link: '#' },
  { type: 'xbox-store', link: '#' },
  { type: 'nintendo-store', link: '#' },
]

const data = mockButtons.map(store => {
  switch (store.type) {
    case 'ps-store':
      return (
        <Button
          key={store.type}
          as="a"
          href={store.link}
          className={styles.StoreButton}
        >
          <img src="/icons/playstation-store.svg" alt="PlayStation Store" />
          PlayStation Store
        </Button>
      )
    case 'gog':
      return (
        <Button
          key={store.type}
          as="a"
          href={store.link}
          className={styles.StoreButton}
        >
          <img src="/icons/gog.svg" alt="GOG" />
          GOG
        </Button>
      )
    case 'egs':
      return (
        <Button
          key={store.type}
          as="a"
          href={store.link}
          className={styles.StoreButton}
        >
          <img src="/icons/egs.svg" alt="Epic Games" />
          Epic Games
        </Button>
      )
    case 'steam':
      return (
        <Button
          key={store.type}
          as="a"
          href={store.link}
          className={styles.StoreButton}
        >
          <img src="/icons/steam.svg" alt="Steam" />
          Steam
        </Button>
      )
    case 'xbox-store':
      return (
        <Button
          key={store.type}
          as="a"
          href={store.link}
          className={styles.StoreButton}
        >
          <img src="/icons/xbox-store.svg" alt="Xbox Store" />
          Xbox Store
        </Button>
      )
    case 'nintendo-store':
      return (
        <Button
          key={store.type}
          as="a"
          href={store.link}
          className={styles.StoreButton}
        >
          <img src="/icons/nintendo-store.svg" alt="Nintendo Store" />
          Nintendo Store
        </Button>
      )
  }
})

function StoreButtons({ buttons }) {
  return <div className={styles.StoreButtons}>{data}</div>
}

export default StoreButtons
