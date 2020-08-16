import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'

const year = new Date().getFullYear()

const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--vertical-5) var(--page-padding);
  padding-bottom: var(--vertical-1);

  & > .copyright {
    display: flex;
    align-items: center;

    & > a {
      display: flex;

      & > img {
        margin-right: var(--horizontal-5);
      }
    }
  }
`

function Footer({ className }) {
  return (
    <StyledFooter className={className} aria-label="footer">
      <div className="copyright">
        <Link href="/">
          <a aria-label="released.at">
            <img
              width="28"
              height="28"
              className="lazyload"
              data-src="/images/logo.png"
              src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
              alt="released.at"
            />
          </a>
        </Link>{' '}
        released.at, {year}
      </div>
      <div>
        <a href="mailto:support@released.at">Обратная связь</a>
      </div>
    </StyledFooter>
  )
}

export default Footer
