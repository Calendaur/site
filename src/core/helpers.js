export function rusType(type) {
  switch (type) {
    case 'series':
      return 'Сериалы'
    case 'films':
      return 'Кино'
    case 'games':
      return 'Игры'
  }
}

export function monthString(monthNum) {
  const monthStr = monthNum.toString()

  return monthStr.length === 1 ? `0${monthStr}` : monthStr
}

export function toApiType(type) {
  switch (type) {
    case 'films':
      return 'movies'
    case 'games':
      return 'games'
    case 'series':
      return 'serials'
  }
}

export function getTypeWithoutS(type) {
  switch (type) {
    case 'films':
      return 'film'
    case 'games':
      return 'game'
    case 'series':
      return type
    default:
      break
  }
}
