import { styled } from 'stitches'

const Text = styled('p', {
  marginTop: '0',
  marginBottom: '$sm',
  fontSize: '$sm',
  lineHeight: '1.625rem',
  letterSpacing: '-0.005625rem',
  variants: {
    as: {
      i: {
        fontStyle: 'italic',
      },
      b: {
        fontWeight: '$bold',
      },
      small: {
        fontSize: '$sm',
      },
    },
    font: {
      primary: {
        fontFamily: '$primary',
      },
      secondary: {
        fontFamily: '$secondary',
      },
    },
  },
})

export default Text
