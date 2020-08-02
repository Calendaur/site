import { format } from 'date-fns'
import ru from 'date-fns/locale/ru'

const currentDate = format(new Date(), 'LLLL yyyy', {
  locale: ru,
})

const getDate = (month, year) =>
  format(new Date(+year, +month, 1), 'LLLL yyyy', {
    locale: ru,
  })

const defaultDescription =
  'Released.at — это удобный календарь для просмотра и отслеживания премьер среди игр, кино и сериалов.'

export const meta = {
  main: {
    title: `Новые игры, кино и сериалы за ${currentDate}`,
    description: defaultDescription,
  },
  films(month, year) {
    return {
      title: `Новые фильмы ${getDate(month, year)}`,
      description:
        'Released.at — это удобный календарь для просмотра и отслеживания премьер среди игр, кино и сериалов.',
    }
  },
  games(month, year) {
    return {
      title: `Hовые игры за ${getDate(month, year)}`,
      description:
        'Новинки игр, собранные в одном месте в удобном формате на released.at',
    }
  },
  series(month, year) {
    return {
      title: `Новые сериалы за ${getDate(month, year)}`,
      description:
        'Новинки сериалов, собранные в одном месте в удобном формате на released.at',
    }
  },
}
