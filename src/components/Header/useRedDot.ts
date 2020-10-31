import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { get, set } from 'js-cookie'
import { cookies, routes } from 'shared/constants'

const dotsDict = {
  whatsNew: cookies.NEED_CHECK_WHATS_NEW,
}

export function useRedDot() {
  const [dots, setDots] = useState({
    whatsNew: false,
  })
  const { asPath } = useRouter()
  const currentMonth = new Date().getMonth().toString()

  useEffect(() => {
    if (
      get(dotsDict.whatsNew) === undefined ||
      get(dotsDict.whatsNew) !== currentMonth
    ) {
      set(dotsDict.whatsNew, 'true', {
        expires: 60,
      })
      setDots({
        ...dots,
        whatsNew: true,
      })
    }

    if (asPath === routes.WHATS_NEW) {
      set(dotsDict.whatsNew, currentMonth, {
        expires: 60,
      })
      setDots({
        ...dots,
        whatsNew: false,
      })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return dots
}
