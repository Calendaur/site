import { GetStaticPaths, GetStaticProps } from 'next'
import compareAsc from 'date-fns/compareAsc'
import { releases, homePageReleases } from 'shared/api'
import { months } from 'shared/constants'
import { groupBy, releaseAdapter } from 'shared/utils'
import { ReleaseType } from 'types/common'
import { generateReleasesPages, getWeeks } from './helpers'
import { meta } from './seo'

export const getPaths: GetStaticPaths = async () => ({
  paths: generateReleasesPages(),
  fallback: false,
})

export const getProps = (type: ReleaseType) => {
  const getStaticProps: GetStaticProps = async ({ params: { date } }) => {
    const result = await releases(type, date)
    const [m, y] = (date as string).split('-')
    const month = months.find(({ eng }) => eng === m)
    const year = +y

    const sorted = result
      .sort((a, b) => compareAsc(new Date(a.released), new Date(b.released)))
      .map(release => releaseAdapter(release, type))
    const grouped = groupBy('released')(sorted)

    return {
      props: {
        meta: meta[type](month.jsNumber, year),
        grouped,
        weeks: JSON.stringify(getWeeks(year, month.jsNumber).flat()),
      },
    }
  }

  return getStaticProps
}

export const getPropsForIndexPage: GetStaticProps = async () => {
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()

  const result = await homePageReleases()

  const sorted = result
    .sort((a, b) => compareAsc(new Date(a.released), new Date(b.released)))
    .map(release => releaseAdapter(release, 'films'))
  const grouped = groupBy('released')(sorted)

  return {
    props: {
      meta: meta.main,
      grouped,
      weeks: JSON.stringify(
        getWeeks(currentYear, months[currentMonth - 1].jsNumber).flat(),
      ),
    },
    revalidate: 60,
  }
}
