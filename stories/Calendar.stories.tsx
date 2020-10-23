import React from 'react'
import Calendar from '../src/components-css/Calendar'

import { filmsJSON } from './mocks/films'
import { seriesJSON } from './mocks/series'
import { gamesJSON } from './mocks/games'

export default { title: 'Calendar' }

console.log(filmsJSON, seriesJSON, gamesJSON)

export const films = () => (
  <Calendar
    releases={filmsJSON}
    month={9}
    year={2020}
    weeks="[null,null,null,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,null]"
  />
)

export const series = () => (
  <Calendar
    releases={seriesJSON}
    month={9}
    year={2020}
    weeks="[null,null,null,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,null]"
  />
)

export const games = () => (
  <Calendar
    releases={gamesJSON}
    month={9}
    year={2020}
    weeks="[null,null,null,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,null]"
  />
)
