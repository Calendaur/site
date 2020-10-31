import React from 'react'
import { GamePlatform } from 'types/common'
import PlatformsList from '../src/components-css/PlatformList'

export default { title: 'Platforms' }

export const platforms = () => (
  <PlatformsList
    platforms={[
      GamePlatform.PC,
      GamePlatform.NintendoSwitch,
      GamePlatform.PS4,
      GamePlatform.PS5,
      GamePlatform.XboxOne,
      GamePlatform.XboxSeries,
    ]}
  />
)
