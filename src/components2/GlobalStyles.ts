import { css } from 'stitches'

const pagePaddings = {
  paddingHorizontal: '$mobilePaddingHorizontal',

  md: {
    paddingHorizontal: '$lg',
  },

  xl: {
    paddingHorizontal: '$xl',
  },

  fullHD: {
    paddingHorizontal: '$xxl',
  },
}

const globalStyles = css.global({
  html: {
    color: '$text',
    boxSizing: 'border-box',
    fontVariantNumeric: 'tabular-nums',
    fontSize: '16px',
  },
  body: {
    textRendering: 'optimizeLegibility',
    position: 'relative',
    minHeight: '100%',
    padding: '0',
    margin: '0',
    overflowX: 'hidden',
    fontFamily: '$primary',
    fontSize: '$sm',
    lineHeight: '1.5',
    scrollBehavior: 'smooth',
    textSizeAdjust: '100%',
    direction: 'ltr',
    fontFeatureSettings: 'kern',
    color: '$text',
    backgroundColor: '$bg',
  },
  '*': {
    '&::before, &::after': {
      boxSizing: 'inherit',
      textRendering: 'geometricPrecision',
      WebkitTapHighlightColor: 'transparent',
    },
  },
  '#__next': {
    overflowX: 'hidden',
  },
  img: {
    maxWidth: '100%',
  },
  '.lazyload, .lazyloading': {
    minHeight: '100px',
    opacity: '0',
  },
  '.loading, .lazyload, .lazyloaded, .image': {
    opacity: '1',
    transition: '1s cubic-bezier(0.215, 0.61, 0.355, 1)',
  },
  '#nprogress .bar': {
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '999',
    width: '100%',
    height: '2px',
    backgroundColor: '$primary',
  },
  '#nprogress .peg': {
    position: 'absolute',
    right: '0',
    display: 'block',
    width: '100px',
    height: '100%',
    boxShadow: '0 0 10px $primary, 0 0 5px $primary',
    opacity: '1',
    transform: 'rotate(3deg) translate(0, -4px)',
  },
  '.nprogress-custom-parent': {
    position: 'relative',
    overflow: 'hidden',
  },
  '.nprogress-custom-parent #nprogress .bar': {
    position: 'absolute',
  },

  header: pagePaddings,
  main: pagePaddings,
  footer: pagePaddings,

  button: {
    margin: '0',
    padding: '0',
    border: 'none',
    cursor: 'pointer',

    ':focus': {
      outline: 'none',
      boxShadow: 'none',
    },
  },
})

export default globalStyles
