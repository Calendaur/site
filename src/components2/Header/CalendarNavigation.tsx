import React from 'react'
import { styled } from 'stitches'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import Button from '../Button'
import { useMonthChanger } from './useMonthChanger'

const StyledCalendarNavigation = styled('div', {
  calendarNavigationBottom: {
    position: 'absolute',
    top: '78px',
    left: '0',
  },

  variants: {
    position: {
      inHeader: {
        display: 'none',

        md: {
          display: 'flex',
          alignItems: 'center',
          marginLeft: '$lg',
        },
      },
      fixed: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '$sm',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.65)',
        borderRadius: '4px',
        backgroundColor: '$primary',
        overflow: 'hidden',

        md: {
          display: 'none',
        },
      },
    },
  },
})

const Buttons = styled('div', {
  display: 'flex',
  alignItems: 'center',

  md: {
    marginLeft: '$md',
  },
})

const ChangeButton = styled('button', {
  center: true,
  width: '32px',
  height: '32px',
  opacity: '0.5',
  backgroundColor: 'transparent',
  transition: '0.25s',

  ':hover': {
    opacity: '1',
  },

  ':disabled': {
    opacity: '0.15',
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
})

const CurrentMonth = styled('p', {
  width: '120px',
  margin: '0 $xs',
  fontSize: '$sm',
  fontWeight: '$medium',
  textTransform: 'capitalize',
  textAlign: 'center',

  md: {
    width: '170px',
    fontSize: '$md',
  },

  '& > span': {
    fontWeight: '$regular',
    opacity: '0.75',
  },
})

export enum CalendarNavigationPosition {
  InHeader = 'inHeader',
  Fixed = 'fixed',
}

interface Props {
  position: CalendarNavigationPosition
}

function CalendarNavigation({ position }: Props) {
  const data = useMonthChanger()

  if (!data) return null

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
    <StyledCalendarNavigation position={position}>
      {position === CalendarNavigationPosition.InHeader ? (
        <Button appearance="secondary" size="small" onClick={goToday}>
          Сегодня
        </Button>
      ) : null}
      <Buttons>
        <ChangeButton
          disabled={disabledPrev}
          onClick={() => {
            push(prevLink.href, prevLink.as)
          }}
        >
          <img width="16" height="16" src="/icons/left.svg" alt="Назад" />
        </ChangeButton>
        <CurrentMonth>
          {format(date, 'LLLL', { locale: ru })} <span>{year}</span>
        </CurrentMonth>
        <ChangeButton
          disabled={disabledNext}
          onClick={() => {
            push(nextLink.href, nextLink.as)
          }}
        >
          <img width="16" height="16" src="/icons/right.svg" alt="Вперед" />
        </ChangeButton>
      </Buttons>
    </StyledCalendarNavigation>
  )
}

export default CalendarNavigation
