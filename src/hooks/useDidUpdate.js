import { useEffect, useRef } from 'react'

function useDidUpdate(callback, inputs) {
  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) {
      callback()
    } else mounted.current = true
  }, inputs) // eslint-disable-line
}

export default useDidUpdate
