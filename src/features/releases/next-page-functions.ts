import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next'
import { releases, homePageReleases } from 'shared/api'
import { months } from 'shared/constants'
import { FRONTEND_RELEASE_TYPES, ParsedURL } from 'types/releases'
import { generateReleasesPages, typeAdapter } from './helpers'
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
  }
}> => {
  const result = await releases(typeAdapter(type), params.date)
  const [m, y] = params.date.split('-')
  const month = months.find(({ eng }) => eng === m)
  const year = +y

  return {
    props: {
      parsedURL: {
        type,
        month,
        year,
      },
      releases: result,
      meta: meta[type](month.jsNumber, year),
    },
  }
}

export async function getPropsForIndexPage() {
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()

  const result = await homePageReleases()

  return {
    props: {
      parsedURL: {
        type: 'films',
        month: months[currentMonth - 1],
        year: currentYear,
      },
      releases: result,
      meta: meta.main,
    },
  }
}
