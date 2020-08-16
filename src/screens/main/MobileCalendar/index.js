import React, { useMemo } from 'react'
import styled from '@emotion/styled'
import { compareAsc, format, parseISO } from 'date-fns'
import ru from 'date-fns/locale/ru'
import { groupBy } from 'shared/utils'
import ReleaseCard from '../ReleaseCard'

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
  const data = useMemo(
    () =>
      groupBy('released')(
        releases.sort((a, b) =>
          compareAsc(new Date(a.released), new Date(b.released)),
        ),
      ),
    [releases],
  )

  return (
    <StyledCalendar>
      {Object.keys(data).map(date => (
        <div className="day" key={`${type}-${date}`}>
          <p>{format(parseISO(date), 'dd EEEEEE', { locale: ru })}</p>
          <div className="releases">
            {data[date].map(release => (
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
