import React from 'react'
import styled from '@emotion/styled'
import { center } from 'core/styles/shared'

const Wrapper = styled.div`
  margin-bottom: var(--vertical-4);

  & > p {
    margin-bottom: var(--vertical-6);
    color: var(--secondary-text);
  }

  & > div {
    display: flex;
    align-items: center;

    & > a {
      --size: 24px;

      ${center}
      width: var(--size);
      height: var(--size);
      margin-right: var(--horizontal-4);
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }

      & > img {
        width: 100%;
        height: 100%;
      }
    }
  }
`

function Sharing({ title, url }) {
  return (
    <Wrapper>
      <p>Поделиться релизом:</p>
      <div>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label="Поделиться через Facebook"
        >
          <img src="/icons/facebook.svg" alt="Поделиться через Facebook" />
        </a>
        <a
          href={`https://vk.com/share.php?url=${url}&title=${title}&utm_source=share2`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label="Поделиться через VK"
        >
          <img src="/icons/vk.svg" alt="Поделиться через VK" />
        </a>
        <a
          href={`https://twitter.com/intent/tweet/?text=${title}&url=${url}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label="Поделиться через Twitter"
        >
          <img src="/icons/twitter.svg" alt="Поделиться через Twitter" />
        </a>
        <a
          href={`tg://msg_url?url=${url}&text=${title}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label="Поделиться через Telegram"
        >
          <img src="/icons/telegram.svg" alt="Поделиться через Telegram" />
        </a>
      </div>
    </Wrapper>
  )
}

export default Sharing
