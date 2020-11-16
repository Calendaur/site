export const sendEvent = (event: string): void => {
  if (typeof window === undefined) return
  ;(window as any).plausible(event)
}
