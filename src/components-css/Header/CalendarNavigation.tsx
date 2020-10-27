
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import cx from 'classnames'
import Button from '../Button'

import styles from './styles.module.css'

export enum CalendarNavigationPosition {
  InHeader = 'inHeader',
  Fixed = 'fixed',
}

interface Props {
  position: CalendarNavigationPosition
  data: {
    push: (href: string, as: string) => void
    goToday: () => void
    disabledPrev: boolean
    disabledNext: boolean
    prevLink: { href: string; as: string }
    nextLink: { href: string; as: string }
    date: Date
    year: number
  }
}

function CalendarNavigation({ position, data }: Props) {
  const {
    push,
    goToday,
    disabledPrev,
    disabledNext,
    prevLink,
    nextLink,
    date,
    year,
  } = data

  return (
    <div
      className={cx(styles.CalendarNavigation, {
        [styles.inHeader]: position === CalendarNavigationPosition.InHeader,
        [styles.fixed]: position === CalendarNavigationPosition.Fixed,
      })}
    >
      {position === CalendarNavigationPosition.InHeader ? (
        <Button secondary size="small" onClick={goToday}>
          Сегодня
        </Button>
      ) : null}
      <div className={styles.ChangeMonthButtons}>
        <button
          disabled={disabledPrev}
          onClick={() => {
            push(prevLink.href, prevLink.as)
          }}
        >
          <img width="16" height="16" src="/icons/left.svg" alt="Назад" />
        </button>
        <p className={styles.CurrentMonth}>
          {format(date, 'LLLL', { locale: ru })} <span>{year}</span>
        </p>
        <button
          disabled={disabledNext}
          onClick={() => {
            push(nextLink.href, nextLink.as)
          }}
        >
          <img width="16" height="16" src="/icons/right.svg" alt="Вперед" />
        </button>
      </div>
    </div>
  )
}

export default CalendarNavigation
