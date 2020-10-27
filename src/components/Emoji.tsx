import { PropsWithChildren, HTMLAttributes } from 'react'

interface Props {
  label: string
}

function Emoji({
  children,
  label,
  ...rest
}: PropsWithChildren<Props & HTMLAttributes<HTMLSpanElement>>) {
  return (
    <span role="img" aria-label={label} {...rest}>
      {children}
    </span>
  )
}

export default Emoji
