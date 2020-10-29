import styles from './styles.module.css'

interface Props {
  title: string
  url: string
}

function Sharing({ title, url }: Props) {
  return (
    <div className={styles.Sharing}>
      <p>Поделиться релизом:</p>
      <div className={styles.SocialList}>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label="Поделиться через Facebook"
        >
          <img
            width="24"
            height="24"
            src="/icons/facebook.svg"
            alt="Поделиться через Facebook"
          />
        </a>
        <a
          href={`https://vk.com/share.php?url=${url}&title=${title}&utm_source=share2`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label="Поделиться через VK"
        >
          <img
            width="24"
            height="24"
            src="/icons/vk.svg"
            alt="Поделиться через VK"
          />
        </a>
        <a
          href={`https://twitter.com/intent/tweet/?text=${title}&url=${url}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label="Поделиться через Twitter"
        >
          <img
            width="24"
            height="24"
            src="/icons/twitter.svg"
            alt="Поделиться через Twitter"
          />
        </a>
        <a
          href={`tg://msg_url?url=${url}&text=${title}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label="Поделиться через Telegram"
        >
          <img
            width="24"
            height="24"
            src="/icons/telegram.svg"
            alt="Поделиться через Telegram"
          />
        </a>
      </div>
    </div>
  )
}

export default Sharing
