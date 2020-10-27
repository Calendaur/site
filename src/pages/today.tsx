import TodayScreen from 'screens/today'
import { today } from 'shared/api'

function TodayPage(props) {
  return <TodayScreen {...props} />
}

export async function getServerSideProps() {
  const releases = await today()

  return {
    props: {
      releases,
    },
  }
}

export default TodayPage
