import React from 'react'

const months = [
  { eng: 'january', rus: 'январь', jsNumber: 0, calendarNumber: 1 },
  { eng: 'february', rus: 'февраль', jsNumber: 1, calendarNumber: 2 },
  { eng: 'march', rus: 'март', jsNumber: 2, calendarNumber: 3 },
  { eng: 'april', rus: 'апрель', jsNumber: 3, calendarNumber: 4 },
  { eng: 'may', rus: 'май', jsNumber: 4, calendarNumber: 5 },
  { eng: 'june', rus: 'июнь', jsNumber: 5, calendarNumber: 6 },
  { eng: 'july', rus: 'июль', jsNumber: 6, calendarNumber: 7 },
  { eng: 'august', rus: 'август', jsNumber: 7, calendarNumber: 8 },
  { eng: 'september', rus: 'сентябрь', jsNumber: 8, calendarNumber: 9 },
  { eng: 'october', rus: 'октябрь', jsNumber: 9, calendarNumber: 10 },
  { eng: 'november', rus: 'ноябрь', jsNumber: 10, calendarNumber: 11 },
  { eng: 'december', rus: 'декабрь', jsNumber: 11, calendarNumber: 12 },
]

export function parseCorrectURL(url) {
  const [, type, monthYear] = url.split('/')
  const [month, year] = monthYear.split('-')

  return {
    type,
    month: months.find(m => m.eng === month),
    year: +year,
  }
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

export function range(min = 0, max) {
  let arr = []

  for (let i = min; i <= max; i++) {
    arr.push(i)
  }

  return arr
}

export function getPlatformIcon(platform) {
  switch (platform) {
    case 'pc':
      return <img src="/icons/windows.svg" alt="" />
    case 'ps_4':
      return <img src="/icons/playstation.svg" alt="" />
    case 'xbox_one':
      return <img src="/icons/xbox.svg" alt="" />
    case 'nintendo_switch':
      return <img src="/icons/nintendo-switch.svg" alt="" />
    default:
      break
  }
}
