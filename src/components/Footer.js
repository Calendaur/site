import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'

const year = new Date().getFullYear()

function Footer({ className }) {
  return (
    <footer className={className} aria-label="footer">
      <div className="copyright">
        <Link href="/">
          <a aria-label="released.at">
            <img
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
    </footer>
  )
}

const StyledFooter = styled(Footer)`
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
        --size: 28px;

        width: var(--size);
        height: var(--size);
        margin-right: var(--horizontal-5);
      }
    }
  }
`

export default StyledFooter
