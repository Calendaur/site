import React from 'react'
import { Button } from '../../components'

import styles from './styles.module.css'

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
    case 'epic-games':
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
    case 'itch':
      return (
        <>
          <img src="/icons/itch-store.svg" alt="Itch Store" />
          itch.io
        </>
      )
    case 'apple-appstore':
      return (
        <>
          <img src="/icons/app-store.svg" alt="Apple Store" />
          Apple Store
        </>
      )
    case 'google-play':
      return (
        <>
          <img src="/icons/google-play.svg" alt="Google Play" />
          Google Play
        </>
      )
    case 'xbox360':
      return (
        <>
          <img src="/icons/xbox-store.svg" alt="Xbox 360 Store" />
          Xbox 360 Store
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
      {store.price && store.price !== '$0.00' && (
        <span>&nbsp;[{store.price}]</span>
      )}
    </Button>
  ))

function prepareStores(stores, rawgStores) {
  if (stores.length) return stores

  if (rawgStores && rawgStores.length)
    return rawgStores.map(store => ({
      link: store.url,
      type: store.store.slug,
    }))

  return []
}

function StoreButtons({ stores, rawgStores, type }) {
  if (type !== 'games') return null

  const preparedStores = prepareStores(stores, rawgStores)

  if (!preparedStores.length) return null

  return (
    <div className={styles.StoreButtons}>
      <p>Где купить:</p>
      <div className={styles.Stores}>{renderStores(preparedStores)}</div>
    </div>
  )
}

export default StoreButtons
