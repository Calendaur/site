import React, { useMemo } from 'react'
import styled from '@emotion/styled'
import { compareAsc, format, parseISO } from 'date-fns'
import ru from 'date-fns/locale/ru'
import { groupBy } from 'shared/utils'
import ReleaseCard from '../ReleaseCard'

const Calendar = styled.div`
  display: block;

  @media (min-width: 1200px) {
    display: none;
  }
`

const Day = styled.div`
  margin-bottom: var(--vertical-1);

  & > p {
    margin-bottom: var(--vertical-6);
    font-weight: bold;
  }
`

const Releases = styled.div`
  display: grid;
  grid-auto-rows: minmax(200px, 1fr);
  grid-gap: 8px;

  @media (min-width: 768px) and (max-width: 1201px) {
    grid-auto-rows: minmax(400px, 1fr);
  }

  > * {
    border-radius: 0;

    &:first-child {
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
    }

    &:last-child {
      border-bottom-right-radius: 20px;
      border-bottom-left-radius: 20px;
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
    <Calendar>
      {Object.keys(data).map(date => (
        <Day key={`${type}-${date}`}>
          <p>{format(parseISO(date), 'dd EEEEEE', { locale: ru })}</p>
          <Releases>
            {data[date].map(release => (
              <ReleaseCard
                type={type}
                key={`${date}-${release.id}`}
                release={release}
              />
            ))}
          </Releases>
        </Day>
      ))}
    </Calendar>
  )
}

export default MobileCalendar
