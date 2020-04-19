import format from 'date-fns/format'
import startOfMonth from 'date-fns/startOfMonth'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import ruLocale from 'date-fns/locale/ru'

export function range(min = 0, max) {
  let arr = []

  for (let i = min; i <= max; i++) {
    arr.push(i)
  }

  return arr
}

export function chunkify(array, chunkSize) {
  const chunks = Array.from(
    { length: Math.ceil(array.length / chunkSize) },
    (_, i) => {
      const start = chunkSize * i

      const chunk = array.slice(start, start + chunkSize)

      if (chunk.length < chunkSize)
        return [...chunk, ...Array.from({ length: chunkSize - chunk.length })]

      return array.slice(start, start + chunkSize)
    },
  )

  return chunks
}

export function getWeeks(year, jsMonthNumber) {
  const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

  const date = new Date(Date.UTC(year, jsMonthNumber, 1))
  const daysArray = range(1, getDaysInMonth(date))
  const firstDay = format(startOfMonth(date), 'EEEEEE', { locale: ruLocale })
  const firstDayIndex = daysOfWeek.findIndex(i => i === firstDay)

  return chunkify(
    firstDayIndex === 0
      ? daysArray
      : [...Array.from({ length: firstDayIndex }), ...daysArray],
    7,
  )
}

export function getCellWidth(vw, releases, dayInCalendar) {
  const allReleasesInDay = releases.filter(
    release => new Date(release.released).getDate() === dayInCalendar,
  )

  if (!allReleasesInDay.length) return 'inherit'

  let measure

  const cellWidth = allReleasesInDay.reduce((acc, curr) => {
    let width

    if (curr.width) {
      width = +curr.width
      measure = '%'
    } else {
      width = +curr.legacy_px_width
      measure = 'px'
    }

    return acc + width
  }, 0)

  return cellWidth + measure
}
