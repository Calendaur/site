const fs = require('fs')
const path = require('path')
const fetch = require('isomorphic-unfetch')
const prettier = require('prettier')
const { eachMonthOfInterval, addMonths, format } = require('date-fns')

const types = ['films', 'games', 'series']
const host = 'https://released.at'
const constantsPages = [host, `${host}/subscribe`, `${host}/whats-new`]
const startDate = new Date(2020, 0, 1)
const endDate = addMonths(new Date(), 1)

const dates = eachMonthOfInterval({ start: startDate, end: endDate })

let allUrls = [...constantsPages]

async function getAll(type) {
  const base = 'https://api.calendaur.com/api'

  try {
    const response = await fetch(`${base}/${type}`)
    const json = await response.json()

    if (response.ok) {
      return json
    } else {
      return {
        error: json,
      }
    }
  } catch (e) {
    console.error(e)
    return {
      error: e,
    }
  }
}

dates.forEach(date => {
  const urlDate = format(date, 'LLLL-yyyy')
  const urls = types.map(type => `${host}/${type}/${urlDate}`.toLowerCase())

  allUrls.push(...urls)
})

const createSitemap = urls => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls
          .map(url => {
            return `
                    <url>
                        <loc>${url}</loc>
                    </url>
                `
          })
          .join('')}
    </urlset>
    `

async function getResult() {
  const films = await getAll('movies')
  const series = await getAll('serials')
  const games = await getAll('games')

  allUrls.push(
    ...[...films, ...series, ...games].map(
      ({ release_id }) => `${host}/release/${release_id}`,
    ),
  )

  const sitemap = createSitemap(allUrls)

  const formatted = prettier.format(sitemap, {
    parser: 'html',
  })

  fs.writeFileSync(
    path.join(__dirname, '..', '..', 'public', 'sitemap.xml'),
    formatted,
  )
}

getResult()
