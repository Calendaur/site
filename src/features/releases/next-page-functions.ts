import { GetStaticPaths, GetStaticPropsContext } from 'next'
import compareAsc from 'date-fns/compareAsc'
import { releases, homePageReleases } from 'shared/api'
import { months } from 'shared/constants'
import { groupBy } from 'shared/utils'
import { FRONTEND_RELEASE_TYPES, ParsedURL } from 'types/releases'
import { generateReleasesPages, getWeeks } from './helpers'
import { meta } from './seo'

export const getPaths: GetStaticPaths = async () => ({
  paths: generateReleasesPages(),
  fallback: false,
})

export const getProps = async (
  { params }: GetStaticPropsContext<{ date: string }>,
  type: FRONTEND_RELEASE_TYPES,
): Promise<{
  props: {
    parsedURL: ParsedURL
    releases: any
    meta: any
    grouped: any
    weeks: any
  }
}> => {
  const result = await releases(type, params.date)
  const [m, y] = params.date.split('-')
  const month = months.find(({ eng }) => eng === m)
  const year = +y

  const sorted = result.sort((a, b) =>
    compareAsc(new Date(a.released), new Date(b.released)),
  )
  const grouped = groupBy('released')(sorted)

  return {
    props: {
      parsedURL: {
        type,
        month,
        year,
      },
      releases: sorted,
      meta: meta[type](month.jsNumber, year),
      grouped,
      weeks: JSON.stringify(getWeeks(year, month.jsNumber).flat()),
    },
  }
}

export async function getPropsForIndexPage() {
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()

  const result = await homePageReleases()

  const sorted = result.sort((a, b) =>
    compareAsc(new Date(a.released), new Date(b.released)),
  )
  const grouped = groupBy('released')(sorted)

  return {
    props: {
      parsedURL: {
        type: 'films',
        month: months[currentMonth - 1],
        year: currentYear,
      },
      releases: sorted,
      meta: meta.main,
      grouped,
      weeks: JSON.stringify(
        getWeeks(currentYear, months[currentMonth - 1].jsNumber).flat(),
      ),
    },
  }
}
