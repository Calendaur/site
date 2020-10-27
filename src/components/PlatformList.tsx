
import styled from '@emotion/styled'
import { platform } from 'os'

export enum Platforms {
  PC = 'pc',
  PS4 = 'ps_4',
  PS5 = 'ps_5',
  XboxOne = 'xbox_one',
  XboxSeries = 'xbox_series',
  NintendoSwitch = 'nintendo_switch',
}

const StyledPlatformList = styled.ul`
  --gap: 6px;

  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: calc(var(--gap) / 2 * (-1));
  list-style-type: none;

  li {
    display: flex;
    padding: 2px 8px;
    margin: calc(var(--gap) / 2);
    font-size: 10px;
    font-weight: 600;
    border-radius: 12px;
  }
`

interface Props {
  className: string
  platforms: Platforms[]
}

const platformDict = {
  [Platforms.PC]: { title: 'PC', color: '#fff', bgColor: '#000', position: 1 },
  [Platforms.PS4]: {
    title: 'PS4',
    color: '#fff',
    bgColor: '#003087',
    position: 2,
  },
  [Platforms.PS5]: {
    title: 'PS5',
    color: '#fff',
    bgColor: '#003087',
    position: 3,
  },
  [Platforms.XboxOne]: {
    title: 'Xbox One',
    color: '#000',
    bgColor: '#52b043',
    position: 4,
  },
  [Platforms.XboxSeries]: {
    title: 'Xbox Series',
    color: '#000',
    bgColor: '#52b043',
    position: 5,
  },
  [Platforms.NintendoSwitch]: {
    title: 'Switch',
    color: '#000',
    bgColor: '#e60012',
    position: 6,
  },
}

function PlatformList({ platforms, className }: Props) {
  const preparedPlatforms = platforms
    .map(platform => platformDict[platform])
    .sort((a, b) => a.position - b.position)

  return (
    <StyledPlatformList className={className}>
      {preparedPlatforms.map(({ title, color, bgColor }) => {
        return (
          <li key={title} style={{ color, backgroundColor: bgColor }}>
            {title}
          </li>
        )
      })}
    </StyledPlatformList>
  )
}

export default PlatformList
