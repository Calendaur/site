import React from 'react'

function TargetBlankA({ children, ...rest }) {
  return (
    <a {...rest} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export default TargetBlankA
