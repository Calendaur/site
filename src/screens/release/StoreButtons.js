import React from 'react'
import styled from '@emotion/styled'
import { Button } from 'components'

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

const Buttons = styled.div`
  margin-bottom: calc(var(--vertical-5) - var(--horizontal-6));

  & > p {
    margin-bottom: var(--vertical-6);
    color: var(--secondary-text);
  }
`

const Stores = styled.div`
  margin: calc(var(--horizontal-6) * -1);
`

const Btn = styled(Button)`
  height: inherit;
  margin: var(--horizontal-6);

  & > img {
    height: 24px;
    margin-right: var(--horizontal-5);
  }

  & > b {
    font-weight: 800;
    color: #222;
  }
`

const renderStores = stores =>
  stores.map(store => (
    <Btn
      key={store.type}
      as="a"
      href={store.link}
      target="_blank"
      rel="nofollow"
    >
      {getStoreLinkContent(store)}
      {store.price && store.price !== '$0.00' && <b>&nbsp;[{store.price}]</b>}
    </Btn>
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
    <Buttons>
      <p>Где купить:</p>
      <Stores>{renderStores(preparedStores)}</Stores>
    </Buttons>
  )
}

export default StoreButtons
