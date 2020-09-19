import React from 'react'
import { useAmp } from 'next/amp'
import styled from '@emotion/styled'
import { routes } from 'shared/constants'
import A from './A'

const year = new Date().getFullYear()

const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--vertical-5) var(--page-padding);
  padding-bottom: var(--vertical-1);

  .copyright {
    display: flex;
    align-items: center;
    height: 28px;

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
        released.at, {year}
      </A>
      <div>
        <a href="mailto:support@released.at">Обратная связь</a>
      </div>
    </StyledFooter>
  )
}

export default Footer
