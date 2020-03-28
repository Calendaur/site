import { checkUrl, fixUrl, parseUrl, months, getNextAndPrevDate } from '../url'

test('check correct urls', () => {
  const correctResult = {
    isCorrectType: true,
    isCorrectMonth: true,
    isCorrectYear: true,
    isCorrect: true,
  }

  expect(checkUrl('/films/february-2020')).toStrictEqual(correctResult)
  expect(checkUrl('/games/march-2021')).toStrictEqual(correctResult)
})

test('check incorrect urls', () => {
  const incorrectResult = {
    isCorrectType: false,
    isCorrectMonth: false,
    isCorrectYear: false,
    isCorrect: false,
  }

  expect(checkUrl('/asd/asd-1888')).toStrictEqual(incorrectResult)
  expect(checkUrl('asfahjsjkf')).toStrictEqual(incorrectResult)
  expect(checkUrl()).toStrictEqual(incorrectResult)
})

test('check partially correct urls', () => {
  expect(checkUrl('/games/asd-1888')).toStrictEqual({
    isCorrectType: true,
    isCorrectMonth: false,
    isCorrectYear: false,
    isCorrect: false,
  })
  expect(checkUrl('/films/february-1888')).toStrictEqual({
    isCorrectType: true,
    isCorrectMonth: true,
    isCorrectYear: false,
    isCorrect: false,
  })
  expect(checkUrl('/asdasd/asda-2020')).toStrictEqual({
    isCorrectType: false,
    isCorrectMonth: false,
    isCorrectYear: true,
    isCorrect: false,
  })
  expect(checkUrl('/asdasd/asda-2019')).toStrictEqual({
    isCorrectType: false,
    isCorrectMonth: false,
    isCorrectYear: false,
    isCorrect: false,
  })
})

test('fix incorrect urls', () => {
  const date = new Date()

  const fallbackType = 'films'
  const fallbackMonth = months.find(m => m.jsNumber === date.getMonth()).eng
  const fallbackYear = date.getFullYear()

  const fallbackUrl = `/${fallbackType}/${fallbackMonth}-${fallbackYear}`

  expect(fixUrl('/asd/asd-1888', { ...checkUrl('/asd/asd-1888') })).toEqual(
    fallbackUrl,
  )
  expect(fixUrl('asfahjsjkf', { ...checkUrl('asfahjsjkf') })).toEqual(
    fallbackUrl,
  )
  expect(fixUrl(undefined, { ...checkUrl() })).toEqual(fallbackUrl)
})

test('fix partially incorrect urls', () => {
  const date = new Date()

  const fallbackType = 'films'
  const fallbackMonth = months.find(m => m.jsNumber === date.getMonth()).eng
  const fallbackYear = date.getFullYear()

  expect(fixUrl('/games/asd-1888', { ...checkUrl('/games/asd-1888') })).toEqual(
    `/games/${fallbackMonth}-${fallbackYear}`,
  )
  expect(
    fixUrl('/films/february-1888', {
      ...checkUrl(`/films/february-1888`),
    }),
  ).toEqual(`/films/february-${fallbackYear}`)
  expect(
    fixUrl('/asdasd/asda-2020', { ...checkUrl('/asdasd/asda-2020') }),
  ).toEqual(`/${fallbackType}/${fallbackMonth}-2020`)
  expect(
    fixUrl('/asdasd/asda-2019', { ...checkUrl('/asdasd/asda-2019') }),
  ).toEqual(`/${fallbackType}/${fallbackMonth}-${fallbackYear}`)
})

test('parse url', () => {
  expect(parseUrl('/films/february-2020')).toEqual({
    type: 'films',
    month: { eng: 'february', rus: 'февраль', jsNumber: 1, calendarNumber: 2 },
    year: 2020,
  })
})

test('check formation of next and prev date', () => {
  expect(getNextAndPrevDate(2, 2020)).toEqual({
    nextMonth: months[3],
    nextYear: 2020,
    prevMonth: months[1],
    prevYear: 2020,
  })

  expect(getNextAndPrevDate(0, 2020)).toEqual({
    nextMonth: months[1],
    nextYear: 2020,
    prevMonth: months[11],
    prevYear: 2019,
  })

  expect(getNextAndPrevDate(11, 2020)).toEqual({
    nextMonth: months[0],
    nextYear: 2021,
    prevMonth: months[10],
    prevYear: 2020,
  })
})
