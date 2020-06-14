import React from 'react'
import { Button } from '../../components'

import styles from './styles.module.css'

const mockStore = [
  {
    type: 'playstation-store',
    link: '#',
    price: 68,
  },
  {
    type: 'gog',
    link: '#',
    price: 68,
  },
  {
    type: 'egs',
    link: '#',
    price: 68,
  },
  {
    type: 'steam',
    link: '#',
    price: 68,
  },
  {
    type: 'xbox-store',
    link: '#',
    price: 68,
  },
  {
    type: 'nintendo',
    link: '#',
    price: 68,
  },
]

const getStoreLinkContent = store => {
  switch (store.type) {
    case 'playstation-store':
      return (
        <>
          <img src="/icons/playstation-store.svg" alt="PlayStation Store" />
          PlayStation Store
        </>
      )
    case 'gog':
      return (
        <>
          <img src="/icons/gog.svg" alt="GOG" />
          GOG
        </>
      )
    case 'egs':
      return (
        <>
          <img src="/icons/egs.svg" alt="Epic Games" />
          Epic Games
        </>
      )
    case 'steam':
      return (
        <>
          <img src="/icons/steam.svg" alt="Steam" />
          Steam
        </>
      )
    case 'xbox-store':
      return (
        <>
          <img src="/icons/xbox-store.svg" alt="Xbox Store" />
          Xbox Store
        </>
      )
    case 'nintendo':
      return (
        <>
          <img src="/icons/nintendo-store.svg" alt="Nintendo Store" />
          Nintendo Store
        </>
      )
  }
}

const renderStores = stores =>
  stores.map(store => (
    <Button
      key={store.type}
      as="a"
      href={store.link}
      className={styles.StoreButton}
      target="_blank"
    >
      {getStoreLinkContent(store)}
      {store.price && <span>&nbsp;[{store.price}$]</span>}
    </Button>
  ))

function StoreButtons({ stores, type }) {
  if (type !== 'games') return null

  return (
    <div className={styles.StoreButtons}>
      <p>Где купить:</p>
      <div className={styles.Stores}>{renderStores(mockStore)}</div>
    </div>
  )
}

export default StoreButtons
