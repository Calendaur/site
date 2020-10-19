import { styled } from 'stitches'

const Button = styled('button', {
  fontFamily: '$primary',
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: '$xs',
  paddingHorizontal: '$sm',
  whiteSpace: 'nowrap',
  textDecoration: 'none',
  border: '1px solid $grey',
  backgroundColor: '$bg',
  color: '$text',
  cursor: 'pointer',
  fontSize: '$xs',
  borderRadius: '4px',
  transition:
    'background-color 200ms ease 0ms, box-shadow 200ms ease 0ms, border 200ms ease 0ms, color 200ms ease 0ms',

  ':disabled': {
    cursor: 'not-allowed',
  },

  ':focus': {
    outline: 'none',
    boxShadow: 'none',
  },

  md: {
    fontSize: '$sm',
  },

  variants: {
    appearance: {
      primary: {
        border: '1px solid transparent',
        backgroundColor: '$primary',
        color: '$text',

        ':hover': {
          backgroundColor: '#276cda',
        },

        ':active': {
          backgroundColor: '#2366d1',
        },

        ':focus': {
          boxShadow: '0 0 0 0.125em rgba(50, 115, 220, 0.25)',
        },
      },
      secondary: {
        border: '1px solid transparent',
        backgroundColor: '#fff',
        color: '#000',

        ':hover': {
          backgroundColor: '#f9f9f9',
        },

        ':active': {
          backgroundColor: '#f2f2f2',
        },

        ':focus': {
          boxShadow: '0 0 0 0.125em rgba(255, 255, 255, 0.25)',
        },
      },
      accent: {
        backgroundColor: '$accent',
        color: '$blackText',
      },
    },
    size: {
      small: {
        fontSize: '$xs',

        md: {
          fontSize: '$xs',
        },
      },
      medium: {
        fontSize: '$md',

        md: {
          fontSize: '$md',
        },
      },
      large: {
        fontSize: '$lg',

        md: {
          fontSize: '$lg',
        },
      },
      fullWidth: {
        width: '100%',
      },
    },
    as: {
      a: {},
    },
  },
})

export default Button
