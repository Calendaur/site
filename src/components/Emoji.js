import React from 'react'

function Emoji({ children, label, ...rest }) {
  return (
    <span role="img" aria-label={label} {...rest}>
      {children}
    </span>
  )
}

export default Emoji
