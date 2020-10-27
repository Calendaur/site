import styled from '@emotion/styled'
import { Film } from 'types/releases'
import ReleaseCard from '../index/ReleaseCard'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
  grid-gap: 24px;

  > a {
    height: 288px;
  }
`

interface Props {
  liked: Film[]
}

function LikedGrid({ liked }: Props) {
  return (
    <Grid>
      {liked.map(release => (
        <ReleaseCard
          type="films"
          key={`in-grid-${release.id}`}
          release={release}
        />
      ))}
    </Grid>
  )
}

export default LikedGrid
