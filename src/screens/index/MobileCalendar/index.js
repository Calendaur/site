import React from 'react'
import dynamic from 'next/dynamic'
import styled from '@emotion/styled'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import ru from 'date-fns/locale/ru'

const ReleaseCard = dynamic(() => import('../ReleaseCard'))

const StyledCalendar = styled.div`
  display: block;

  @media (min-width: 1200px) {
    display: none;
  }

  .day {
    margin-bottom: var(--vertical-1);

    & > p {
      margin-bottom: var(--vertical-6);
      font-weight: bold;
    }
  }

  .releases {
    display: grid;
    grid-auto-rows: minmax(200px, 1fr);
    grid-gap: 8px;

    @media (min-width: 768px) and (max-width: 1201px) {
      grid-auto-rows: minmax(400px, 1fr);
    }

    > * {
      border-radius: 0;

      &:first-of-type {
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
      }

      &:last-of-type {
        border-bottom-right-radius: 20px;
        border-bottom-left-radius: 20px;
      }
    }
  }
`

function MobileCalendar({ releases, type }) {
  return (
    <StyledCalendar>
      {Object.keys(releases).map(date => (
        <div className="day" key={`${type}-${date}`}>
          <p>{format(parseISO(date), 'dd EEEEEE', { locale: ru })}</p>
          <div className="releases">
            {releases[date].map(release => (
              <ReleaseCard
                type={type}
                key={`${date}-${release.id}`}
                release={release}
              />
            ))}
          </div>
        </div>
      ))}
    </StyledCalendar>
  )
}

export default MobileCalendar
