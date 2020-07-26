import React, { createContext, useReducer, useEffect } from 'react'

export const StoreContext = createContext()

function reducer(state, { type, payload }) {
  switch (type) {
    case 'releasesPageData/set':
      return {
        ...state,
        releasesPageData: payload,
      }
    case 'me/set':
      return {
        ...state,
        me: payload,
      }
    case 'me/unset':
      return {
        ...state,
        me: null,
      }
    case 'me/update':
      return {
        ...state,
        me: {
          ...state.me,
          ...payload,
        },
      }
    case 'me/setToken':
      return {
        ...state,
        me: {
          ...state.me,
          token: payload,
        },
      }
    default:
      return state
  }
}

export const StoreProvider = ({ children, initialStore }) => {
  const [store, dispatch] = useReducer(reducer, initialStore)

  // Because releasesPageData set in _app.js
  useEffect(() => {
    dispatch({
      type: 'releasesPageData/set',
      payload: initialStore.releasesPageData,
    })
  }, [initialStore.releasesPageData])

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}
