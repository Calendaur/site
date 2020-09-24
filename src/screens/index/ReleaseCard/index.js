import React from 'react'
import dynamic from 'next/dynamic'
import { useAmp } from 'next/amp'
import styled from '@emotion/styled'
import slugify from '@sindresorhus/slugify'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import { A } from 'components'
import Info from './Info'

const ExpectButton = dynamic(() => import('components/ExpectButton'))
const Image = dynamic(() => import('components/Image'))

const Card = styled(A)`
  position: relative;
  display: flex;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  border-radius: 14px;
  will-change: transform, opacity;
  transition: transform 0.3s;

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.9) 100%
    );
  }

  @media (min-width: 768px) {
    &:hover {
      transform: translate(0, -4px);

      & > button,
      .released-date {
        opacity: 1;
        transform: translate(0, 4px);
      }
    }

    &:active {
      transform: translate(0, 0);
    }
  }

  & > .aspectRatio {
    position: relative;
    width: 100%;
    height: 100%;

    &.isAmp {
      amp-img img {
        object-fit: cover;
      }
    }

    &:not(.isAmp) {
      & > img {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    &::after {
      display: block;
      width: 100%;
      height: 0;
      padding-bottom: 42.86%;
      content: '';
    }
  }

  .released-date {
    position: absolute;
    top: 8px;
    left: 8px;
    z-index: 1;
    display: inline-flex;
    padding: 0 10px;
    font-size: 14px;
    font-weight: 600;
    color: var(--black-color);
    white-space: nowrap;
    background-color: var(--white-color);
    border-radius: 24px;
    transition: var(--animation-time);
  }

  .expect-button {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 999;
    opacity: 1;

    @media (min-width: 1200px) {
      opacity: 0;
    }
  }

  .type {
    position: absolute;
    top: 8px;
    z-index: 9;
    display: inline-block;
    padding: 0 8px;
    padding-bottom: 2px;
    margin: 0 8px;
    margin-bottom: 4px;
    font-weight: 600;
    letter-spacing: 0.5px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`

function typeLabel(type) {
  if (type.includes('film')) {
    return {
      text: 'кино',
      backgroundColor: '#d2e603',
      color: '#000',
    }
  }

  if (type.includes('game')) {
    return {
      text: 'игра',
      backgroundColor: '#9d65c9',
      color: '#fff',
    }
  }

  if (type.includes('series')) {
    return {
      text: 'сериал',
      backgroundColor: '#ea5455',
      color: '#fff',
    }
  }
}

function ReleaseCard({
  release,
  type,
  showDate = false,
  showType = false,
  className = '',
}) {
  const isAmp = useAmp()
  const slug = slugify(release.title)

  function renderType() {
    const { text, backgroundColor, color } = typeLabel(type)

    return (
      <div className="type" style={{ backgroundColor, color }}>
        {text}
      </div>
    )
  }

  return (
    <Card
      className={className}
      href="/release/[id]"
      as={`/release/${release.release_id}-${slug}`}
    >
      {showType && renderType()}
      {showDate && (
        <div className="released-date">
          {format(new Date(release.released), 'd MMM', { locale: ru })}
        </div>
      )}
      <ExpectButton className="expect-button" release={release} />
      <div className={isAmp ? 'aspectRatio isAmp' : 'aspectRatio'}>
        <Image src={release.cover} alt={release.title} />
      </div>
      <Info release={release} type={type} showType={showType} />
    </Card>
  )
}

export default ReleaseCard
