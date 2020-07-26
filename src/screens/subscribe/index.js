import React, { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import { A, Button } from 'components'
import { PRIVACY_POLICY } from 'core/routes'

const Title = styled.h1`
  margin-bottom: var(--vertical-1);
`

const Desc = styled.p`
  margin-bottom: var(--vertical-4);
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin-bottom: var(--vertical-5);

  label {
    margin-bottom: var(--vertical-6);
  }

  input {
    -webkit-appearance: none;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    height: 2.5em;
    padding-top: calc(0.5em - 1px);
    padding-right: calc(0.75em - 1px);
    padding-bottom: calc(0.5em - 1px);
    padding-left: calc(0.75em - 1px);
    font-size: 1rem;
    line-height: 1.5;
    color: var(--black);
    vertical-align: top;
    background-color: #fff;
    border: 1px solid transparent !important;
    border-color: #dbdbdb;
    border-radius: 4px !important;
    outline: none;
    box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);

    &:active,
    &:focus {
      border-color: #3273dc !important;
      box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
    }

    &:hover {
      border-color: #b5b5b5 !important;
    }
  }
`

const Btn = styled(Button)`
  margin: 0 !important;
`

const Privacy = styled.p`
  margin: 0;
  font-size: 0.625rem;
`

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
        <title>Подписаться</title>
        <style
          dangerouslySetInnerHTML={{
            __html: `#mce-success-response { margin: 0 !important }`,
          }}
        ></style>
      </Head>
      <div id="mc_embed_signup">
        <form
          action="https://calendaur.us4.list-manage.com/subscribe/post?u=323bb705c0e362f6f4fd8143c&amp;id=509c02cc4c"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate"
          target="_blank"
          noValidate
          style={{ padding: 0 }}
        >
          <div id="mc_embed_signup_scroll">
            <Title>Подписаться</Title>
            <Desc>
              Раз в&nbsp;две недели мы&nbsp;будем отправлять красивые письма
              с&nbsp;несколькими ключевыми релизами. Ничего лишнего&nbsp;&mdash;
              лаконично и&nbsp;по&nbsp;существу, чтобы вы&nbsp;могли оставаться
              в&nbsp;курсе событий.
            </Desc>
            <Field>
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
            </Field>
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
              <Btn
                type="submit"
                name="subscribe"
                id="mc-embedded-subscribe"
                primary
              >
                Подписаться
              </Btn>
            </div>
            <Privacy>
              Подписываясь, вы соглашаетесь с{' '}
              <A href={PRIVACY_POLICY}>политикой конфиденциальности</A> сайта
              released.at
            </Privacy>
          </div>
        </form>
      </div>
    </>
  )
}

export default SubscribePage
