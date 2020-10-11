import { format } from 'date-fns'
import ru from 'date-fns/locale/ru'

const currentDate = format(new Date(), 'LLLL yyyy', {
  locale: ru,
})

const getDate = (month: number, year: number) =>
  format(new Date(+year, +month, 1), 'LLLL yyyy', {
    locale: ru,
  })

const defaultDescription =
  'Released — удобный календарь для просмотра и отслеживания новых игр, кино и сериалов. Узнайте дату выхода новых игр, кино и сериалов. Подпишитесь на уведомления, чтобы ничего не пропустить'

export const meta = {
  main: {
    title: `Новые игры, кино и сериалы за ${currentDate}. Дата выхода фильмов игр и сериалов на Released`,
    description: defaultDescription,
  },
  films(month: number, year: number) {
    return {
      title: `Новые фильмы ${getDate(
        month,
        year,
      )}. Дата выхода фильмов на Released`,
      description: `Премьеры кино, собранные в одном месте в удобном формате на Released. Точные даты выхода новых фильмов за ${getDate(
        month,
        year,
      )} в календаре релизов`,
    }
  },
  games(month: number, year: number) {
    return {
      title: `Hовые игры за ${getDate(
        month,
        year,
      )}. Дата выхода игр на Released`,
      description: `Премьеры игр, собранные в одном месте в удобном формате на Released. Точные даты выхода новых игр за ${getDate(
        month,
        year,
      )} в календаре релизов`,
    }
  },
  series(month: number, year: number) {
    return {
      title: `Новые сериалы за ${getDate(
        month,
        year,
      )}. Дата выхода сериалов на Released`,
      description: `Премьеры сериалов, собранные в одном месте в удобном формате на Released. Точные даты выхода новых сериалов за ${getDate(
        month,
        year,
      )} в календаре релизов`,
    }
  },
}
