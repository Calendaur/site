import { useTransition, useChain } from 'react-spring'

function useReleaseAnimation(ref, releases) {
  const transitions = useTransition(releases, item => item.id, {
    ref,
    unique: true,
    reset: true,
    trail: 500 / releases.length,
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
  })

  useChain([ref], [0.3])

  return transitions
}

export default useReleaseAnimation
