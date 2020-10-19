import { createStyled } from '@stitches/react'

export const { styled, css } = createStyled({
  tokens: {
    colors: {
      $primary: 'hsl(214, 90%, 53%)',
      $accent: 'hsl(174, 100%, 52%)',
      $bg: 'hsl(0, 0%, 10%)',
      $text: 'hsl(0, 0%, 100%)',
      $blackText: 'hsl(0, 0%, 10%)',
      $grey: 'hsl(0, 0%, 86%)',
      $pureBlack: 'hsl(0, 0%, 0%)',
      $pureWhite: 'hsl(0, 0%, 100%)',
    },
    fonts: {
      $primary: 'Inter, system-ui',
      $secondary: 'Merriweather, system-ui',
      $logo: 'Montserrat, system-ui',
    },
    fontSizes: {
      $xxs: '0.75rem',
      $xs: '0.875rem',
      $sm: '1rem',
      $md: '1.25rem',
      $lg: '1.5rem',
      $xl: '2.25rem',
      $xxl: '3rem',
    },
    fontWeights: {
      $regular: '400',
      $medium: '600',
      $bold: '800',
    },
    space: {
      $mobilePaddingHorizontal: '16px',
      $xxs: '4px',
      $xs: '8px',
      $sm: '12px',
      $md: '20px',
      $lg: '32px',
      $xl: '52px',
      $xxl: '84px',
    },
  },
  breakpoints: {
    sm: rule => `@media (min-width: 576px) { ${rule} }`,
    md: rule => `@media (min-width: 768px) { ${rule} }`,
    lg: rule => `@media (min-width: 992px) { ${rule} }`,
    xl: rule => `@media (min-width: 1200px) { ${rule} }`,
    fullHD: rule => `@media (min-width: 1920px) { ${rule} }`,
    quadHD: rule => `@media (min-width: 2560px) { ${rule} }`,

    calendarNavigationBottom: rule =>
      `@media (min-width: 768px) and (max-width: 1024px) { ${rule} }`,
  },
  utils: {
    marginVertical: value => ({
      marginTop: value,
      marginBottom: value,
    }),
    marginHorizontal: value => ({
      marginRight: value,
      marginLeft: value,
    }),
    paddingVertical: value => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    paddingHorizontal: value => ({
      paddingRight: value,
      paddingLeft: value,
    }),
    center: () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    spaceBetween: () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }),
    column: () => ({
      display: 'flex',
      flexDirection: 'column',
    }),
  },
})
