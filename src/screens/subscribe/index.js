import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Header, Footer } from '../../components'

import styles from './styles.module.css'

function SubscribePage() {
  const [email, setEmail] = useState('')

  return (
    <>
      <Head>
        <link
          href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css"
          rel="stylesheet"
          type="text/css"
        />
        <script
          type="text/javascript"
          src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';}(jQuery));var $mcj = jQuery.noConflict(true);`,
          }}
        />
        <title>Calendaur | Подписаться</title>
        <style
          dangerouslySetInnerHTML={{
            __html: `#mce-success-response { margin: 0 !important }`,
          }}
        ></style>
      </Head>
      <Header hasBack />
      <main className={styles.Main}>
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
              <h1>Подписаться</h1>
              <p className={styles.Desc}>
                Подписавшись на&nbsp;рассылку, вы&nbsp;будете получать каждые
                две недели красивые письма с&nbsp;популярными релизами
              </p>
              <div className={styles.Field}>
                <label htmlFor="mce-EMAIL">Email</label>
                <input
                  type="email"
                  value={email}
                  name="EMAIL"
                  className="required email"
                  id="mce-EMAIL"
                  onChange={e => setEmail(e.target.value)}
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
                <input
                  type="submit"
                  value="Подписаться"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="button"
                />
              </div>
              <p className={styles.Privacy}>
                Подписываясь, вы соглашаетесь с{' '}
                <Link href="/privacy-policy">
                  <a>политикой конфиденциальности</a>
                </Link>{' '}
                сайта calendaur.com
              </p>
              <p className={styles.PoweredBy}>
                Powered by{' '}
                <a
                  href="http://eepurl.com/g1CEZz"
                  title="MailChimp - email marketing made easy and fun"
                >
                  <img src="/icons/mailchimp.svg" alt="Mailchimp" />
                </a>
              </p>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default SubscribePage
