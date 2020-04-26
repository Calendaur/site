import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Rodal from 'rodal'
import cx from 'classnames'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import { getPlatformIcon } from '../ReleaseCard'

import styles from './styles.module.css'

function A({ href, children, ...rest }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  )
}

function Buttons({ type, release }) {
  if (type === 'films') {
    return (
      <div className={styles.Buttons}>
        {release.kinopoisk_url && (
          <A
            href={release.kinopoisk_url}
            className={cx(styles.Button, styles.Kinopoisk)}
          >
            <img
              alt="КиноПоиск"
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='15' viewBox='0 0 120 15'%3E %3Cpath fill='%23FFF' fill-rule='evenodd' d='M5.762 9.016H4.704v5.748H0V0h4.704v5.374H5.86L8.447 0h4.782L9.897 6.91l3.841 7.854H8.564L5.762 9.016zm16.05.354h-.274l-2.978 2.618v2.776h-4.508V2.953h4.508v4.449h.391l2.862-2.52v-1.93h4.507v11.812h-4.507V9.37zm13.641 1.22h-3.057v4.174h-4.508V2.953h4.508v4.016h3.057V2.953h4.508v11.81h-4.508v-4.172zm11.955-7.854c.81 0 1.561.125 2.254.374.692.25 1.29.63 1.793 1.142.503.512.898 1.152 1.186 1.92.287.767.431 1.663.431 2.686 0 1.037-.144 1.94-.431 2.707-.288.768-.683 1.404-1.186 1.91a4.794 4.794 0 0 1-1.783 1.131 6.463 6.463 0 0 1-2.225.374h-.607a6.896 6.896 0 0 1-2.313-.374 4.843 4.843 0 0 1-1.822-1.132c-.51-.505-.908-1.141-1.196-1.909-.287-.768-.431-1.67-.431-2.707 0-1.023.144-1.919.431-2.687.288-.767.683-1.407 1.186-1.919a4.722 4.722 0 0 1 1.793-1.142 6.666 6.666 0 0 1 2.273-.374h.647zm-.255 8.465c.497 0 .899-.2 1.206-.6.307-.4.46-.982.46-1.743 0-.76-.153-1.342-.46-1.742-.307-.4-.71-.6-1.206-.6h-.156c-.523 0-.935.2-1.235.6-.3.4-.45.981-.45 1.742s.15 1.342.45 1.742c.3.4.712.6 1.235.6h.156zM53.993 0h12.543v14.764h-4.704V3.839h-3.135v10.925h-4.704V0zm19.794 2.736c.81 0 1.562.125 2.254.374.693.25 1.29.63 1.793 1.142.503.512.899 1.152 1.186 1.92.288.767.431 1.663.431 2.686 0 1.037-.143 1.94-.43 2.707-.288.768-.684 1.404-1.187 1.91a4.794 4.794 0 0 1-1.783 1.131 6.463 6.463 0 0 1-2.224.374h-.608a6.896 6.896 0 0 1-2.313-.374 4.843 4.843 0 0 1-1.822-1.132c-.51-.505-.908-1.141-1.196-1.909-.287-.768-.43-1.67-.43-2.707 0-1.023.143-1.919.43-2.687.288-.767.683-1.407 1.186-1.919a4.722 4.722 0 0 1 1.793-1.142 6.666 6.666 0 0 1 2.274-.374h.646zm-.254 8.465c.496 0 .898-.2 1.205-.6.307-.4.46-.982.46-1.743 0-.76-.153-1.342-.46-1.742-.307-.4-.709-.6-1.205-.6h-.157c-.523 0-.934.2-1.235.6-.3.4-.45.981-.45 1.742s.15 1.342.45 1.742c.3.4.712.6 1.235.6h.157zm14.796-1.83h-.274l-2.98 2.617v2.776h-4.507V2.953h4.508v4.449h.392l2.861-2.52v-1.93h4.508v11.812h-4.508V9.37zm17.697.098c-.039.97-.209 1.804-.51 2.5-.3.695-.698 1.27-1.195 1.722a4.609 4.609 0 0 1-1.744.994 7.205 7.205 0 0 1-2.175.315h-.608c-.836 0-1.61-.128-2.322-.384a4.963 4.963 0 0 1-1.842-1.151c-.516-.512-.918-1.152-1.206-1.92-.287-.767-.424-1.663-.411-2.687.013-1.023.163-1.919.45-2.687.288-.767.683-1.407 1.186-1.919A4.825 4.825 0 0 1 97.442 3.1a6.511 6.511 0 0 1 2.274-.383h.647c.77 0 1.492.108 2.165.324.673.217 1.261.548 1.764.994.503.447.908 1.001 1.215 1.664.307.663.48 1.434.52 2.313h-4.293c-.065-.499-.245-.873-.539-1.122-.293-.25-.656-.374-1.087-.374h-.177c-.51 0-.914.2-1.215.6-.3.4-.45.981-.45 1.742s.15 1.342.45 1.742c.3.4.706.6 1.215.6h.177c.457 0 .836-.147 1.136-.442.301-.295.47-.725.51-1.29h4.272zm6.41.846h-.824v4.449h-4.508V2.953h4.508v4.134h.843l2.273-4.134h4.684l-3.018 5.492L120 14.764h-5.017l-2.548-4.449z'/%3E %3C/svg%3E"
            ></img>
          </A>
        )}
        {release.imdb_url && (
          <A href={release.imdb_url} className={cx(styles.Button, styles.Imdb)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="32"
              viewBox="0 0 64 32"
            >
              <g
                transform="translate(8.000000, 7.000000)"
                fill="#000"
                fillRule="nonzero"
              >
                <polygon points="0 18 5 18 5 0 0 0" />
                <path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z" />
                <path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z" />
                <path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z" />
              </g>
            </svg>
          </A>
        )}
      </div>
    )
  }

  return null
}

function ReleaseInfoModal({ isOpen, onClose, release, type }) {
  const { query } = useRouter()
  const contentRef = useRef()

  const url = `https://calendaur.com/${query.type}/${query.date}`

  useEffect(() => {
    if (isOpen && release) {
      window.location.hash = release.id

      setTimeout(() => {
        const modal = document.querySelector('.rodal-dialog')
        modal.style.height = contentRef.current.scrollHeight + 'px'
      }, 20)
    }

    return () => {
      window.history.replaceState(null, null, ' ')
    }
  }, [isOpen, release])

  return (
    <Rodal
      className={styles.Modal}
      width={100}
      measure="%"
      visible={isOpen}
      onClose={onClose}
      animation="slideDown"
    >
      {release ? (
        <div className={styles.Content} ref={contentRef}>
          <div className={styles.About}>
            <h2 className={styles.Title}>{release.title}</h2>
            <p className={styles.Info}>
              <span>Дата выхода:</span>&nbsp;
              {format(new Date(release.released), 'd MMMM yyyy', {
                locale: ru,
              })}
            </p>
            {type === 'films' && (
              <p className={styles.Info}>
                <span>Режиссёры:</span>&nbsp;{release.director}
              </p>
            )}
            {type === 'games' && (
              <div className={styles.Info}>
                <span>Платформы:</span>&nbsp;
                <ul className={styles.PlatformList}>
                  {release.platforms.map(platform => (
                    <li key={platform}>{getPlatformIcon(platform)}</li>
                  ))}
                </ul>
              </div>
            )}
            {type === 'series' && (
              <p className={styles.Info}>
                <span>Сезон:</span>&nbsp;{release.season}
              </p>
            )}
            <p className={styles.Desc}>{release.description}</p>
            <div className={styles.Sharing}>
              Поделиться:
              <A
                href={`https://www.facebook.com/sharer/sharer.php?u=${`${url}%23${release.id}`}&t=${
                  release.title
                }`}
              >
                <img src="/icons/facebook.svg" alt="" />
              </A>
              <A
                href={`https://vk.com/share.php?url=${`${url}%23${release.id}`}&title=${
                  release.title
                }&utm_source=share2`}
              >
                <img src="/icons/vk.svg" alt="" />
              </A>
              <A
                href={`https://twitter.com/intent/tweet/?text=${
                  release.title
                }&url=${`${url}%23${release.id}`}`}
              >
                <img src="/icons/twitter.svg" alt="" />
              </A>
              <A
                href={`tg://msg_url?url=${`${url}%23${release.id}`}&text=${
                  release.title
                }`}
              >
                <img src="/icons/telegram.svg" alt="" />
              </A>
            </div>
            <Buttons type={type} release={release} />
          </div>
          <div className={styles.Cover}>
            <img src={release.cover} alt={release.title} />
          </div>
        </div>
      ) : null}
    </Rodal>
  )
}

export default ReleaseInfoModal
