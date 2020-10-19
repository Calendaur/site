import { styled } from 'stitches'

const Title = styled('h1', {
  marginTop: '0',
  marginBottom: '$sm',
  fontFamily: '$primary',
  fontSize: '$xxl',
  fontWeight: '$bold',
  lineHeight: '1.5',
  letterSpacing: '-0.066875rem',
  variants: {
    as: {
      h1: {
        marginBottom: '$md',
        fontSize: '$xl',
        lineHeight: '1.2',
        letterSpacing: '-0.066875rem',

        md: {
          marginBottom: '$lg',
          fontSize: '$xxl',
          lineHeight: '1.5',
        },
      },
      h2: {
        fontSize: '$lg',
        lineHeight: '1.4',
        letterSpacing: '-0.020625rem',

        md: {
          marginBottom: '$md',
          fontSize: '$xl',
          lineHeight: '1.5',
        },
      },
      h3: {
        fontSize: '$lg',
        fontWeight: '$medium',
        letterSpacing: '-0.029375rem',
      },
      h4: {
        fontSize: '$md',
        fontWeight: '$medium',
        letterSpacing: '-0.020625rem',
      },
      h5: {
        fontSize: '$sm',
        fontWeight: '$medium',
        letterSpacing: '-0.01125rem',
      },
      h6: {
        marginBottom: '$xs',
        fontSize: '$xs',
        fontWeight: '$medium',
        letterSpacing: '-0.005625rem',
      },
    },
  },
})

export default Title
