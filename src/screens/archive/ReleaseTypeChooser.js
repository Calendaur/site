import styled from '@emotion/styled'
import cx from 'classnames'

const types = [
  {
    type: 'films',
    title: 'Кино',
  },
  {
    type: 'series',
    title: 'Сериалы',
  },
  {
    type: 'games',
    title: 'Игры',
  },
]

const Styled = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;
  margin-top: var(--vertical-5);
  margin-bottom: var(--vertical-1);
  list-style: none;

  @media (min-width: 768px) {
    margin-top: 0;
  }

  & > li {
    margin-right: var(--horizontal-4);

    & > button {
      position: relative;
      font-size: 1.4rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      opacity: 0.4;
      transition: var(--transition);

      @media (min-width: 768px) {
        font-size: 2.4rem;
      }

      &.active {
        opacity: 1;
      }

      &:hover {
        opacity: 1;
      }
    }
  }
`

function ReleaseTypeChooser({ selected, setSelect }) {
  return (
    <Styled>
      {types.map(({ type: t, title }) => (
        <li key={t}>
          <button
            className={cx({
              active: t === selected,
            })}
            onClick={() => {
              setSelect(t)
              window.location.hash = t
            }}
          >
            {title}
          </button>
        </li>
      ))}
    </Styled>
  )
}

export default ReleaseTypeChooser
