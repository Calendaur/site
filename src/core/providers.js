import React, { createContext } from 'react'

export const ReleasePageDataContext = createContext()

export function ReleasePageDataProvider({ children, value }) {
  return (
    <ReleasePageDataContext.Provider value={value}>
      {children}
    </ReleasePageDataContext.Provider>
  )
}
