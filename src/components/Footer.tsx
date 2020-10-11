import React from 'react'
import styled from '@emotion/styled'
import { routes } from 'shared/constants'
import A from './A'
import Image from './Image'

const year = new Date().getFullYear()

const StyledFooter = styled.footer`
  padding: var(--vertical-5) var(--page-padding);
  padding-bottom: var(--vertical-1);

  .top-part,
  .bottom-part,
  .bottom-part a,
  .copyright {
    display: flex;
  }

  .top-part {
    justify-content: space-between;

    a {
      font-size: 14px;

      @media (min-width: 768px) {
        font-size: 16px;
      }
    }

    .copyright {
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
  }

  .bottom-part {
    justify-content: flex-end;

    a {
      --size: 28px;

      width: var(--size);
      height: var(--size);
    }
  }
`

interface Props {
  className?: string
}

function Footer({ className }: Props) {
  return (
    <StyledFooter className={className} aria-label="footer">
      <div className="top-part">
        <A href={routes.HOME} className="copyright" aria-label="released.at">
          <Image
            width="28"
            height="28"
            src="/images/logo.png"
            alt="released.at"
          />{' '}
          <span>released.at, {year}</span>
        </A>
        <div>
          <a href="mailto:support@released.at">support@released.at</a>
        </div>
      </div>
      <div className="bottom-part">
        <a
          href="https://zen.yandex.ru/id/5f702b5d243429689bde2890"
          target="_blank"
          rel="noreferrer nofollow"
        >
          <Image
            width="28"
            height="28"
            src="/icons/zen.svg"
            alt="Яндекс Дзен"
          />
        </a>
      </div>
    </StyledFooter>
  )
}

export default Footer
