import  { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { useSprings, animated, to as interpolate } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import slugify from '@sindresorhus/slugify'
import { Button, A } from 'components'
import { Film } from 'types/releases'
import Meta from './Meta'
import LikedGrid from './LikedGrid'

const Wrapper = styled.div`
  min-height: 600px;

  .hint {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (min-width: 768px) {
      font-size: 2rem;
    }
  }

  .card-wrapper {
    position: absolute;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    will-change: transform;
  }

  .card {
    display: flex;
    flex-direction: column;
    width: 30vh;
    min-width: 288px;
    height: 55vh;
    min-height: 480px;
    overflow: hidden;
    user-select: none;
    background-color: rgb(15, 15, 15);
    will-change: transform;
    border-radius: 32px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 1);

    .cover {
      height: 50%;
      user-select: none;
      -webkit-user-drag: none;
      object-fit: cover;
    }

    .footer {
      padding: 24px 16px;
      user-select: none;

      @media (min-width: 768px) {
        padding: 24px;
      }

      .title {
        margin: 0;
        margin-bottom: var(--vertical-5);
        font-size: 1.8rem;
        font-weight: bold;
        line-height: 1.125;

        @media (min-width: 768px) {
          font-size: 2.4rem;
        }
      }

      a {
        text-decoration: underline;
        -webkit-user-drag: none;
      }

      .director {
        margin-bottom: var(--vertical-6);
      }
    }
  }

  .buttons {
    margin-top: var(--vertical-3);

    button:first-child {
      margin-right: var(--horizontal-4);
      margin-bottom: var(--vertical-5);
    }
  }
`

const Description = styled.div`
  .hint {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.4rem;

    @media (min-width: 768px) {
      font-size: 2rem;
    }
  }
`

const to = (index: number) => ({
  x: 0,
  y: index * 4,
  scale: 1,
  rot: -5 + Math.random() * 10,
  delay: index * 100,
})
const from = () => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
const trans = (rotate: number, scale: number) =>
  `rotateX(30deg) rotateY(${
    rotate / 10
  }deg) rotateZ(${rotate}deg) scale(${scale})`

interface Props {
  films: Film[]
}

function WhatToSeeScreen({ films }: Props) {
  const [part, setPart] = useState<number[]>([0, 10])
  const [deck, setDeck] = useState<Film[]>(films.slice(...part))
  const [isShowLiked, setIsShowLiked] = useState<boolean>(false)
  const [gone] = useState<Set<number>>(() => new Set())
  const [liked, setLiked] = useState<Film[]>([])
  const [props, set] = useSprings(deck.length, (index: number) => ({
    ...to(index),
    from: from(),
  }))

  useEffect(() => {
    document.body.style.overflowX = 'hidden'
  }, [])

  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2
      const dir = xDir < 0 ? -1 : 1

      if (!down && trigger) {
        const right = dir === 1

        if (right) {
          setLiked([...liked, deck[index]])
        }

        gone.add(index)
      }
      set(i => {
        if (index !== i) return

        const isGone = gone.has(index)
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0)
        const scale = down ? 1.1 : 1
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        }
      })
      if (!down && gone.size === deck.length) {
        setTimeout(() => {
          gone.clear()

          if (liked.length === 0) {
            const nextPart = part.map(i => i + 10)
            const nextDeck = films.slice(...nextPart)

            setPart(nextDeck.length ? nextPart : [0, 10])
            setDeck(nextDeck.length ? nextDeck : films.slice(0, 10))
            set(i => to(i))
            return
          }

          setIsShowLiked(true)
        }, 600)
      }
    },
  )

  return (
    <>
      <Meta />
      <Description>
        <h1>Выберите фильм для просмотра</h1>
        <p>
          Для тех, кто долго не&nbsp;может выбрать кино, мы&nbsp;сделали
          &laquo;тиндер&raquo;. Только в&nbsp;нем вы&nbsp;листаете
          не&nbsp;девушек, а&nbsp;фильмы. Принцип работы простой: свайп
          влево&nbsp;&mdash; дизлайк, свайп вправо&nbsp;&mdash; лайк. Далее
          выбираете из&nbsp;тех фильмов, которым вы&nbsp;поставили лайк.
          Удачного поиска{' '}
          <span role="img" aria-label="heart">
            💖
          </span>
        </p>
        {!isShowLiked ? (
          <div className="hint">
            <div>
              ←&nbsp;
              <span role="img" aria-label="thumbs">
                👎
              </span>
            </div>
            <div>
              <span role="img" aria-label="thumbs">
                👍
              </span>
              &nbsp;→
            </div>
          </div>
        ) : null}
      </Description>
      <Wrapper>
        {props.map(({ x, y, rot, scale }, index) => {
          const { cover, title, director, released, release_id } = deck[index]
          const slug = slugify(title)

          return (
            <animated.div key={index} style={{ x, y }} className="card-wrapper">
              <animated.div
                className="card"
                {...bind(index)}
                style={{
                  transform: interpolate([rot, scale], trans),
                }}
              >
                <img className="cover" src={cover} alt={title} />
                <div className="footer">
                  <div>
                    {format(new Date(released), 'd MMMM yyyy', {
                      locale: ru,
                    })}
                  </div>
                  <p className="title">{title}</p>
                  <div className="director">Режиссер: {director}</div>
                  <A
                    href="/release/[id]"
                    as={`/release/${release_id}-${slug}`}
                    target="_blank"
                  >
                    Открыть страницу релиза
                  </A>
                </div>
              </animated.div>
            </animated.div>
          )
        })}
        {isShowLiked ? (
          <>
            <LikedGrid liked={liked} />
            <div className="buttons">
              <Button
                onClick={() => {
                  const nextPart = part.map(i => i + 10)
                  const nextDeck = films.slice(...nextPart)

                  setPart(nextDeck.length ? nextPart : [0, 10])
                  setDeck(nextDeck.length ? nextDeck : films.slice(0, 10))
                  set(i => to(i))
                  setIsShowLiked(false)
                }}
              >
                Посмотреть еще
              </Button>
              {liked.length > 1 ? (
                <Button
                  primary
                  onClick={() => {
                    setDeck(liked)
                    setLiked([])
                    set(i => to(i))
                    setIsShowLiked(false)
                  }}
                >
                  Выбрать из понравившихся
                </Button>
              ) : null}
            </div>
          </>
        ) : null}
      </Wrapper>
    </>
  )
}

export default WhatToSeeScreen
