import React from 'react'
import { Global, css } from '@emotion/react'

const GlobalStyles = (
  <Global
    styles={css`
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local(''), url('/fonts/Inter/400.woff2') format('woff2');
      }

      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: local(''), url('/fonts/Inter/600.woff2') format('woff2');
      }

      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 800;
        font-display: swap;
        src: local(''), url('/fonts/Inter/800.woff2') format('woff2');
      }

      @font-face {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 200;
        font-display: swap;
        src: local(''), url('/fonts/Montserrat/200.woff2') format('woff2');
      }

      :root {
        /* Colors */
        --background-color-rgb-values: 11, 11, 11;
        --background-color: rgb(var(--background-color-rgb-values));
        --white-color: #e0e0e0;
        --black-color: #070404;
        --grey-color: #b5b5b5;

        /* Fonts */
        --sans: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
          'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
          'Helvetica Neue', sans-serif;
        --logo-font: Montserrat;

        /* Margins */
        --page-padding: 16px;
        --page-vertical-padding: 16px;

        /* Other */
        --transition: 0.3s;

        @media (min-width: 1024px) {
          --page-padding: 60px;
        }

        @media (min-width: 1440px) {
          --page-padding: 80px;
        }

        --primary: #281b24;
        --secondary: #a6b12e;
        --light-blue: #8bb5f9;
        --blue: #1977f3;
        --blue-hover: #2c82f4;
        --blue-active: #0f71f2;
        --pink: #dc6175;
        --kinopoisk: #f60;
        --imdb: #f5c518;
        --black: #0f0f0f;
        --primary-text: #f9f9f9;
        --secondary-text: #b5b5b5;
        --bg-rgb: 10, 10, 10;
        --transition: 0.25s;
        --drop-shadow: 0 2px 8px rgba(244, 244, 244, 0.15);
        --tablet: 768px;
        --desktop: 1200px;
        --desktop-2k: 1920px;
        --footer-height: 124px;
        --animation-time: 0.25s;

        /* Vertical Margins */
        --vertical-1: 48px;
        --vertical-2: 40px;
        --vertical-3: 32px;
        --vertical-4: 24px;
        --vertical-5: 16px;
        --vertical-6: 8px;

        /* Horizontal Margins */
        --horizontal-1: 80px;
        --horizontal-2: 40px;
        --horizontal-3: 32px;
        --horizontal-4: 12px;
        --horizontal-5: 8px;
        --horizontal-6: 4px;

        /* Streaming services colors */
        --amediateka: #191a1d;
        --ivi: #f8104d;
        --kinopoisk-hd: #333;
        --netflix: #141414;
        --okko: #1a082c;
      }

      html,
      body {
        color: var(--white-color);
        background-color: var(--background-color);
      }

      html {
        box-sizing: border-box;
        font-size: 16px;
        font-variant-numeric: tabular-nums;

        @media (min-width: 2200px) {
          font-size: 20px;
        }

        @media (max-width: 1399px) {
          font-size: 16px;
        }

        @media (max-width: 1199px) {
          font-size: 14px;
        }

        @media (max-width: 980px) {
          font-size: 16px;
        }
      }

      body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        position: relative;
        min-height: 100%;
        padding: 0;
        margin: 0;
        overflow-x: hidden;
        font-family: var(--sans);
        font-size: 1rem;
        line-height: 1.5;
        scroll-behavior: smooth;
        text-size-adjust: 100%;
        font-variant-numeric: tabular-nums;
      }

      #__next {
        overflow-x: hidden;
      }

      *,
      *::before,
      *::after {
        box-sizing: inherit;
        text-rendering: geometricPrecision;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 0 0 0.625rem 0;
        color: inherit;
      }

      h1 {
        font-size: 1.5rem;
        font-weight: 800;
        line-height: 1.125;

        @media (min-width: 768px) {
          font-size: 3rem;
        }
      }

      h2 {
        font-size: 2.25rem;
        font-weight: 600;
      }

      h3 {
        font-size: 1.5rem;
        font-weight: 600;
      }

      h4 {
        font-size: 1.25rem;
        font-weight: 600;
      }

      h5 {
        font-size: 1rem;
        font-weight: 600;
      }

      h6 {
        font-size: 0.875rem;
        font-weight: 600;
      }

      p,
      small {
        font-family: var(--sans);
        font-weight: 400;
        color: inherit;
      }

      p {
        max-width: 768px;
        margin: 1rem 0;
        font-size: 1em;
        line-height: 1.625rem;
      }

      b {
        font-weight: 600;
      }

      small {
        margin: 0;
        font-size: 0.875rem;
        line-height: 1.5;
      }

      span {
        font-size: inherit;
        font-weight: inherit;
        color: inherit;
      }

      img {
        max-width: 100%;
      }

      a {
        align-items: center;
        font-size: inherit;
        color: inherit;
        text-decoration: none;
        cursor: pointer;
        transition: var(--transition);
        -webkit-touch-callout: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-box-align: center;
      }

      a.underline,
      button.underline {
        position: relative;

        &:hover::after {
          width: 100%;
        }

        &::after {
          position: absolute;
          top: 100%;
          left: 50%;
          width: 0;
          height: 2px;
          content: '';
          background: var(--primary-text);
          transition: width 0.4s;
          transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
          transform: translateX(-50%);
        }
      }

      button,
      input,
      select,
      textarea {
        margin: 0;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        color: inherit;
      }

      button:focus,
      input:focus,
      select:focus,
      textarea:focus {
        outline: none;
      }

      button {
        padding: 0;
        cursor: pointer;
        background-color: transparent;
        border: none;
      }

      .lazyload,
      .lazyloading {
        opacity: 0;
        min-height: 100px;
      }

      .loading,
      .lazyload,
      .lazyloaded,
      .image {
        opacity: 1;
        transition: 1s cubic-bezier(0.215, 0.61, 0.355, 1);
      }
    `}
  />
)

export default GlobalStyles
