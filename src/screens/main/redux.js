import { createSlice } from '@reduxjs/toolkit'

const releasesSlice = createSlice({
  name: 'releases',
  initialState: [],
  reducers: {
    setReleases: (state, action) => action.payload,
  },
})

const currentURLSlice = createSlice({
  name: 'url',
  initialState: { type: 'films', year: new Date().getFullYear(), month: {} },
  reducers: {
    changeURL: (state, action) => ({
      type: action.payload.type.replace('s', ''),
      year: action.payload.year,
      month: action.payload.month,
    }),
  },
})

const backgroundsSlice = createSlice({
  name: 'backgrounds',
  initialState: [],
  reducers: {
    setBackgrounds: (state, action) => action.payload,
  },
})

export const reducers = {
  releases: releasesSlice.reducer,
  url: currentURLSlice.reducer,
  backgrounds: backgroundsSlice.reducer,
}

export const actions = {
  setReleases: releasesSlice.actions.setReleases,
  setBackgrounds: backgroundsSlice.actions.setBackgrounds,
  changeURL: currentURLSlice.actions.changeURL,
}
