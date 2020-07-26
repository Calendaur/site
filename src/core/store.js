import React, { createContext, useReducer, useEffect } from 'react'

export const StoreContext = createContext()

function reducer(state, { type, payload }) {
  switch (type) {
    case '@reinit':
      return payload
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

  useEffect(() => {
    dispatch({ type: '@reinit', payload: initialStore })
  }, [initialStore])

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}
