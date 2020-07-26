import React, { useReducer, useContext, createContext, useEffect } from 'react'

const StoreStateContext = createContext()
const StoreDispatchContext = createContext()

function reducer(state, { type, payload }) {
  switch (type) {
    case '@reinit':
      return payload
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

export const StoreProvider = ({ children, init }) => {
  const [store, dispatch] = useReducer(reducer, init)

  useEffect(() => {
    dispatch({ type: 'releasesPageData/set', payload: init.releasesPageData })
  }, [init.releasesPageData])

  return (
    <StoreDispatchContext.Provider value={dispatch}>
      <StoreStateContext.Provider value={store}>
        {children}
      </StoreStateContext.Provider>
    </StoreDispatchContext.Provider>
  )
}

export const useStore = () => useContext(StoreStateContext)
export const useDispatch = () => useContext(StoreDispatchContext)
