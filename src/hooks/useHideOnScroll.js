import { useState, useEffect } from 'react'

function useHideOnScroll(initialState = true) {
  const [isVisible, setVisible] = useState(initialState)

  useEffect(() => {
    let prevScrollPos = window.pageYOffset

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      setVisible(Math.abs(prevScrollPos) > currentScrollPos)

      prevScrollPos = currentScrollPos
    }

    window.addEventListener('scroll', handleScroll, {
      capture: true,
      passive: true,
    })

    return () =>
      window.removeEventListener('scroll', handleScroll, {
        capture: true,
        passive: true,
      })
  }, [])

  return [isVisible, setVisible]
}

export default useHideOnScroll
