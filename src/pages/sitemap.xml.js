import { api } from '../core/api'

const EXTERNAL_DATA_URL = 'https://released.at/release'

const createSitemap = all => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${[
          ...all.map(({ release_id }) => {
            return `
                  <url>
                    <loc>${`${EXTERNAL_DATA_URL}/${release_id}`}</loc>
                  </url>
                `
          }),
          `
          <url>
            <loc>https://released.at</loc>
          </url>
          <url>
            <loc>https://released.at/subscribe</loc>
          </url>
          <url>
            <loc>https://released.at/whats-new</loc>
          </url>
          <url>
            <loc>https://released.at/films/july-2020</loc>
          </url>
          <url>
            <loc>https://released.at/games/july-2020</loc>
          </url>
          <url>
            <loc>https://released.at/series/july-2020</loc>
          </url>
          `,
        ].join('')}
    </urlset>
    `

function Sitemap() {
  return null
}

export default Sitemap

export const getServerSideProps = async ({ res }) => {
  const films = await api.getAll('movies')
  const series = await api.getAll('serials')
  const games = await api.getAll('games')

  const all = [...films, ...series, ...games]

  res.setHeader('Content-Type', 'text/xml')
  res.write(createSitemap(all))
  res.end()

  return {
    props: {},
  }
}
