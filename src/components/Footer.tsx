import React from 'react'
import styled from '@emotion/styled'
import { routes } from 'shared/constants'
import A from './A'
import Image from './Image'

const year = new Date().getFullYear()

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 120px;
  padding: var(--vertical-5) var(--page-padding);

  a {
    font-size: 0.875rem;
  }

  .top-part,
  .bottom-part,
  .bottom-part button,
  .copyright {
    display: flex;
  }

  .top-part {
    justify-content: space-between;
    margin-bottom: var(--horizontal-5);

    .copyright {
      align-items: center;
      font-size: 0.875rem;

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
        <a href="mailto:support@released.at">support@released.at</a>
      </div>
      <div className="bottom-part">
        <button
          onClick={() => {
            window.open(
              'https://zen.yandex.ru/id/5f702b5d243429689bde2890',
              '_blank',
            )
          }}
        >
          <Image
            width="28"
            height="28"
            src="/icons/zen.svg"
            alt="Яндекс Дзен"
            lazy={false}
          />
        </button>
      </div>
    </StyledFooter>
  )
}

export default Footer
