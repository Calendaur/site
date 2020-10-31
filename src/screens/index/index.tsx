import dynamic from 'next/dynamic'
import { Calendar, FilmsSeriesGames } from 'components'
import Meta from './Meta'

const Notifications = dynamic(() => import('components/Notifications'), {
  ssr: false,
})

function MainPage({ grouped, meta, weeks }) {
  return (
    <div>
      <Notifications />
      <Meta meta={meta} />
      <FilmsSeriesGames />
      <Calendar weeks={weeks} releases={grouped} />
    </div>
  )
}

export default MainPage
