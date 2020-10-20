import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import Cookies from 'js-cookie'

async function parse(response) {
  if (response.status === 204 || response.statusText === 'No Content') {
    return
  }

  const text = await response.text()
  let data
  try {
    data = JSON.parse(text)
  } catch (e) {
    console.error(e)
    throw { response, error: e } // eslint-disable-line
  }
  if (response.ok) {
    return data
  }
  throw { response, error: data } // eslint-disable-line
}

export async function fetchJSON(input, init = {}) {
  const response = await fetch(input, {
    ...init,
    headers: {
      ...(init.headers || {}),
      'Content-Type': 'application/json',
    },
  })
  return parse(response)
}

export async function fetchWithToken(input, init = {}, token) {
  const response = await fetch(input, {
    ...init,
    headers: {
      ...(init.headers || {}),
      'Content-Type': 'application/json',
      Authorization: token || Cookies.get('authorization'),
    },
  })
  return parse(response)
}

export function redirect(ctx, to) {
  if (ctx.res) {
    ctx.res.writeHead(303, { Location: to })
    ctx.res.end()
  } else {
    Router.replace(to)
  }
}

export const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key]
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
    return objectsByKeyValue
  }, {})

export function range(min = 0, max) {
  let arr = []

  for (let i = min; i <= max; i++) {
    arr.push(i)
  }

  return arr
}

export function getPageUrl(asPath) {
  return `https://released.at${asPath}`
}

export function getCookie(source, name) {
  if (!source) return null

  try {
    const matches = source.match(
      new RegExp(
        '(?:^|; )' +
          name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') +
          '=([^;]*)',
      ),
    )
    return matches ? decodeURIComponent(matches[1]) : null
  } catch (e) {
    return null
  }
}

export function getYoutubeId(youtubeUrl) {
  if (!/youtu\.?be/.test(youtubeUrl)) {
    console.error(`Incorrect youtube url: ${youtubeUrl} `)
    return null
  }

  const patterns = [
    /youtu\.be\/([^#&?]{11})/,
    /\?v=([^#&?]{11})/,
    /&v=([^#&?]{11})/,
    /embed\/([^#&?]{11})/,
    /\/v\/([^#&?]{11})/,
  ]

  let id = ''

  patterns.forEach(pattern => {
    if (pattern.test(youtubeUrl)) {
      id = pattern.exec(youtubeUrl)[1]
    }
  })

  return id
}
