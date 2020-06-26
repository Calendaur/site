import React, { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Header, MainPageContent, Title, Text, Button } from '../../components'

import styles from './styles.module.css'

function SubscribePage() {
  const inputRef = useRef()
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [inputRef])

  return (
    <>
      <Head>
        <link
          href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css"
          rel="stylesheet"
          type="text/css"
        />
        <script src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';}(jQuery));var $mcj = jQuery.noConflict(true);`,
          }}
        />
        <title>Postergaze | Подписаться</title>
        <style
          dangerouslySetInnerHTML={{
            __html: `#mce-success-response { margin: 0 !important }`,
          }}
        ></style>
      </Head>
      <Header hasBack />
      <MainPageContent>
        <div id="mc_embed_signup">
          <form
            action="https://calendaur.us4.list-manage.com/subscribe/post?u=323bb705c0e362f6f4fd8143c&amp;id=509c02cc4c"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
            noValidate
          >
            <div id="mc_embed_signup_scroll">
              <Title className={styles.Title}>Подписаться</Title>
              <Text className={styles.Desc}>
                Раз в&nbsp;две недели мы&nbsp;будем отправлять красивые письма
                с&nbsp;несколькими ключевыми релизами. Ничего
                лишнего&nbsp;&mdash; лаконично и&nbsp;по&nbsp;существу, чтобы
                вы&nbsp;могли оставаться в&nbsp;курсе событий.
              </Text>
              <div className={styles.Field}>
                <label htmlFor="mce-EMAIL">Email</label>
                <input
                  type="email"
                  value={email}
                  name="EMAIL"
                  className="required email"
                  id="mce-EMAIL"
                  onChange={e => setEmail(e.target.value)}
                  placeholder="email@domain.com"
                  ref={inputRef}
                />
              </div>
              <div id="mce-responses" className="clear">
                <div
                  className="response"
                  id="mce-error-response"
                  style={{ display: 'none' }}
                ></div>
                <div
                  className="response"
                  id="mce-success-response"
                  style={{ display: 'none' }}
                ></div>
              </div>
              <div
                style={{ position: 'absolute', left: -5000 }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="b_323bb705c0e362f6f4fd8143c_509c02cc4c"
                  tabIndex="-1"
                  value=""
                />
              </div>
              <div className="clear">
                <Button
                  type="submit"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className={styles.Button}
                  isPrimary
                >
                  Подписаться
                </Button>
              </div>
              <p className={styles.Privacy}>
                Подписываясь, вы соглашаетесь с{' '}
                <Link href="/privacy-policy">
                  <a>политикой конфиденциальности</a>
                </Link>{' '}
                сайта calendaur.com
              </p>
            </div>
          </form>
        </div>
      </MainPageContent>
    </>
  )
}

export default SubscribePage
