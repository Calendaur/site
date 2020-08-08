import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import { Button, ExpectButton } from 'components'
import { getRusReleaseType } from 'core/helpers'
import Head from './Head'
import ExtraInfo from './ExtraInfo'
import StoreButtons from './StoreButtons'
// import StreamingServicesButtons from './StreamingServicesButtons'
import FilmButtons from './FilmButtons'
import Sharing from './Sharing'
import Trailer from './Trailer'

const Breadcrumbs = styled.div`
  margin-top: 190px;
  margin-bottom: var(--vertical-4);
  overflow: hidden;
  color: var(--secondary-text);
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (min-width: 768px) {
    margin-top: 0;
  }

  a:hover {
    color: var(--primary-text);
  }

  & > p {
    display: inline;
    margin: 0;
  }
`

const Cover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 260px;
  background: linear-gradient(
    0deg,
    rgb(var(--gradient-rgb)) 0%,
    rgba(var(--gradient-rgb), 0.94) 7.25%,
    rgba(var(--gradient-rgb), 0.86) 12.45%,
    rgba(var(--gradient-rgb), 0.78) 16.48%,
    rgba(var(--gradient-rgb), 0.09) 40.26%,
    rgba(var(--gradient-rgb), 0.04) 44%,
    rgba(var(--gradient-rgb), 0) 52%
  );
  opacity: 0.81;

  @media (min-width: 768px) {
    height: 100%;
    background: unset;
    opacity: 0.19;
  }

  img {
    position: relative;
    z-index: -1;
    width: 100%;
    height: 100%;
    object-fit: cover;

    @media (min-width: 768px) {
      filter: blur(8px);
    }
  }
`

const Gradient = styled.div`
  --gradient-rgb: 0, 0, 0;

  position: absolute;
  width: 100%;
  height: 260px;
  background: linear-gradient(
    0deg,
    rgb(var(--gradient-rgb)) 0%,
    rgba(var(--gradient-rgb), 0.94) 7.25%,
    rgba(var(--gradient-rgb), 0.86) 12.45%,
    rgba(var(--gradient-rgb), 0.78) 16.48%,
    rgba(var(--gradient-rgb), 0.09) 40.26%,
    rgba(var(--gradient-rgb), 0.04) 44%,
    rgba(var(--gradient-rgb), 0) 52%
  );

  @media (min-width: 768px) {
    display: none;
  }
`

const Title = styled.h1`
  display: inline-flex;
  align-items: center;
  margin-bottom: var(--vertical-6);

  button {
    margin-left: 20px;
  }
`

const OriginalTitle = styled.h2`
  margin-bottom: var(--vertical-5);
  color: var(--secondary-text);
  font-size: 1.5rem;
`

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 20px;
  margin-bottom: var(--vertical-2);

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const Data = styled.div`
  flex: 1;
  margin-right: 0;

  @media (min-width: 768px) {
    margin-right: var(--horizontal-2);
  }

  @media (min-width: 1024px) {
    margin-right: var(--horizontal-1);
  }

  header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: 24px;
    margin-bottom: var(--vertical-1);

    > div {
      display: flex;
      align-items: center;
      margin-right: var(--horizontal-4);
      font-size: 1rem;
      line-height: 22px;
      letter-spacing: 0.08em;

      @media (min-width: 768px) {
        font-size: 1.125rem;
      }

      img {
        width: 24px;
      }
    }
  }
`

const Text = styled.div`
  max-width: 768px;
  margin-bottom: var(--vertical-2);
`

const ScrollToTrailer = styled(Button)`
  margin-bottom: var(--vertical-6);

  @media (min-width: 768px) {
    display: none !important;
  }
`

function Release({
  type,
  title,
  description,
  released,
  cover,
  director,
  platforms,
  season,
  kinopoisk_url,
  imdb_url,
  trailer_url,
  is_digital,
  stores,
  original_title,
  rawg_io_fields,
  id,
}) {
  const { query } = useRouter()
  const url = `https://released.at/release/${query.id}`

  return (
    <>
      <Head title={title} description={description} url={url} cover={cover} />
      <Breadcrumbs>
        <Link
          href={`/${type}/[date]`}
          as={`/${type}/${format(
            new Date(released),
            'MMMM-yyyy',
          )}`.toLowerCase()}
        >
          <a>
            {getRusReleaseType(type, true)}{' '}
            {format(new Date(released), 'LLLL yyyy', {
              locale: ru,
            })}
          </a>
        </Link>
        <span> / </span>
        <p>{title}</p>
      </Breadcrumbs>
      <Cover>
        <Gradient />
        <img
          crossOrigin="anonymous"
          loading="lazy"
          className="lazyload"
          src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
          data-src={cover}
          alt={title}
        />
      </Cover>
      <Title>
        {title}{' '}
        <ExpectButton release={{ released, release_id: query.id, id }} />
      </Title>
      {original_title && <OriginalTitle>{original_title}</OriginalTitle>}
      <Description>
        <Data>
          <header>
            <div>
              {format(new Date(released), 'd MMMM yyyy', {
                locale: ru,
              })}
            </div>
            <div>{getRusReleaseType(type)}</div>
            {type === 'films' && is_digital === true ? (
              <div>Цифровой релиз</div>
            ) : null}
            {type === 'films' && is_digital === false ? (
              <div>Релиз в кинотеатре</div>
            ) : null}
          </header>
          {trailer_url && (
            <ScrollToTrailer
              onClick={() => {
                const trailerEl = document.querySelector('#trailer')
                trailerEl.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
            >
              Смотреть трейлер
            </ScrollToTrailer>
          )}
          <ExtraInfo
            type={type}
            director={director}
            platforms={platforms}
            season={season}
          />
          <Text>{description}</Text>
          <Sharing title={title} url={url} />
          <FilmButtons type={type} kinopoisk={kinopoisk_url} imdb={imdb_url} />
          {/* <StreamingServicesButtons type={type} /> */}
          <StoreButtons
            type={type}
            rawgStores={rawg_io_fields?.stores}
            stores={stores}
          />
        </Data>
        {trailer_url && <Trailer url={trailer_url} />}
      </Description>
    </>
  )
}

export default Release
