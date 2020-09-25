import fs from 'fs'
import prettier from 'prettier'
import path from 'path'
import { format, eachMonthOfInterval, addMonths } from 'date-fns'
import slugify from '@sindresorhus/slugify'
import * as api from './api'

const host = 'https://released.at'
const types = ['films', 'games', 'series']
const constantsPages = [
  host,
  `${host}/blog`,
  `${host}/today`,
  `${host}/what-to-see`,
]
const dates = eachMonthOfInterval({
  start: new Date(2020, 0, 1),
  end: addMonths(new Date(), 1),
})

let allUrls = [...constantsPages]

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
  const [games, films, series] = await api.allReleases()
  const { posts } = await api.posts()

  allUrls.push(
    ...[...films, ...series, ...games].map(
      ({ release_id, title }) =>
        `${host}/release/${release_id}-${slugify(title)}`,
    ),
  )

  allUrls.push(
    ...posts.map(({ id, title }) => `${host}/blog/${id}-${slugify(title)}`),
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
