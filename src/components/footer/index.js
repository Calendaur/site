import React from 'react'
import styles from './styles.module.css'

const year = new Date().getFullYear()

function Footer() {
  return (
    <footer className={styles.Footer}>
      <p className={styles.Copyright}>
        © {year},&nbsp;Библиотека вымерших динозавров
        <br />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="mailto:deaddinocalendar@gmail.com"
        >
          Свяжитесь с нами
        </a>
      </p>
      <ul className={styles.Socials}>
        <li>
          <a
            href="https://teleg.run/deaddinos"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icons/telegram.svg" alt="" />
          </a>
        </li>
        <li>
          <a
            href="https://vk.com/deaddinos"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icons/vk.svg" alt="" />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/calensaur/site/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icons/github.svg" alt="" />
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
