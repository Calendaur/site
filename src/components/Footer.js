import React from 'react'
import { useAmp } from 'next/amp'
import styled from '@emotion/styled'
import { routes } from 'shared/constants'
import A from './A'

const year = new Date().getFullYear()

const StyledFooter = styled.footer`
  padding: var(--vertical-5) var(--page-padding);
  padding-bottom: var(--vertical-1);

  & > div:first-child {
    display: flex;
    justify-content: space-between;

    a {
      font-size: 14px;

      @media (min-width: 768px) {
        font-size: 16px;
      }
    }
  }

  & > div:last-child {
    display: flex;
    justify-content: flex-end;

    a {
      width: 28px;
      height: 28px;
    }
  }

  .copyright {
    display: flex;
    align-items: center;
    height: 28px;
    font-size: 14px;

    img {
      display: none;
    }

    @media (min-width: 400px) {
      img,
      amp-img {
        display: block;
      }
    }

    & > img,
    & > amp-img {
      margin-right: var(--horizontal-5);
    }
  }
`

function Footer({ className }) {
  const isAmp = useAmp()

  return (
    <StyledFooter className={className} aria-label="footer">
      <div>
        <A href={routes.HOME} className="copyright" aria-label="released.at">
          {isAmp ? (
            <amp-img src="/images/logo.png" width="28" height="28" />
          ) : (
            <img
              width="28"
              height="28"
              className="lazyload"
              data-src="/images/logo.png"
              src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
              alt="released.at"
            />
          )}{' '}
          <span>released.at, {year}</span>
        </A>
        <div>
          <a href="mailto:support@released.at">support@released.at</a>
        </div>
      </div>
      <div>
        <a
          href="https://zen.yandex.ru/id/5f702b5d243429689bde2890"
          target="_blank"
          rel="noreferrer nofollow"
        >
          <img
            width="28"
            height="28"
            className="lazyload"
            data-src="/icons/zen.svg"
            src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
            alt="Яндекс Дзен"
          />
        </a>
      </div>
    </StyledFooter>
  )
}

export default Footer
