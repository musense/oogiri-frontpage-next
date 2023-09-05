import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Meta } from '@layouts/Meta'
import { Main } from '@components/Main/Main'

import {
  getRelatedArticles,
  getPreviousAndNextPageById,
  getMainContentBySitemapUrl,
  getPopularContents,
  getTitleContents,
} from '@services/titleContents'
import {
  getTagContents,
  getTagInfo,
  getTagList,
  getPopularTagList,
} from '@services/tagContents'

import ContentPage from '@components/content/ContentPage'
import Marketing from '@components/marketing/Marketing'
import TrendLayout from '@components/TrendLayout/TrendLayout'
import ExtendReading from '@components/content/extendReading'
import PageTemplate from '@components/page/pageTemplate'

type CommonProps = InferGetServerSidePropsType<typeof getServerSideProps>

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL
  const sitemapUrl = params?.sitemapUrl as string
  console.log('🚀 ~ file: index.tsx:98 ~ sitemapUrl:', sitemapUrl)
  let payload = {
    apiUrl: apiUrl,
    sitemapUrl: `${process.env.NEXT_PUBLIC_TREND_SITE}/${sitemapUrl}`,
    _id: null,
    page: 1,
    categoryName: '',
    tagName: '',
  }

  let mainContent

  if (sitemapUrl.indexOf('p_') !== -1) {
    mainContent = await getMainContentBySitemapUrl(payload)
    if (!mainContent) {
      return {
        props: {},
      }
    }
    mainContent = {
      ...mainContent,
      name: mainContent.categories.name,
    }
    payload = {
      ...payload,
      _id: mainContent._id,
    }
    const promisePreviousAndNextPage = getPreviousAndNextPageById(payload)
    const promiseRelatedArticles = getRelatedArticles(payload)
    const promisePopularTagList = getPopularTagList(payload)

    const { previousAndNextPage, relatedArticles, popularTagList } =
      await Promise.all([
        promisePreviousAndNextPage,
        promiseRelatedArticles,
        promisePopularTagList,
      ]).then((res) => {
        console.log('🚀 ~ file: index.tsx:160 ~ ]).then ~ res:', res)
        return {
          previousAndNextPage: res[0],
          relatedArticles: res[1],
          popularTagList: res[2],
        }
      })

    return {
      props: {
        mainTitle: mainContent.name,
        mainContent: mainContent,
        previousAndNextPage: previousAndNextPage,
        relatedArticles: relatedArticles,
        popularTagList: popularTagList,
        sitemapUrl: sitemapUrl,
        meta: {
          headTitle: mainContent.headTitle,
          headDescription: mainContent.headDescription,
          headKeyword: mainContent.headKeyword,
        },
      },
    }
  }

  if (sitemapUrl?.indexOf('tag_') !== -1) {
    const tagList = await getTagList(payload)
    mainContent = tagList.find((tag: any) => tag.sitemapUrl === sitemapUrl)
    payload = {
      ...payload,
      tagName: mainContent.name,
    }
    const promiseTagItems = getTagContents(payload)
    const promiseTagInfo = getTagInfo(payload)
    const promisePopularContents = getPopularContents(payload)
    const promisePopularTagList = getPopularTagList(payload)

    const { tagItems, tagInfo, popularContents, popularTagList } =
      await Promise.all([
        promiseTagItems,
        promiseTagInfo,
        promisePopularContents,
        promisePopularTagList,
      ]).then((res) => {
        console.log('🚀 ~ file: index.tsx:258 ~ ]).then ~ res:', res)
        return {
          tagItems: res[0],
          tagInfo: res[1],
          popularContents: res[2],
          popularTagList: res[3],
        }
      })

    return {
      props: {
        mainTitle: mainContent.name,
        commonPageItems: tagItems,
        sitemapUrl: sitemapUrl,
        popularContents: popularContents,
        popularTagList: popularTagList,
        meta: {
          headTitle: tagInfo.headTitle,
          headDescription: tagInfo.headDescription,
          headKeyword: tagInfo.headKeyword,
        },
      },
    }
  }

  return {
    props: {},
  }
}

const Page = ({
  relatedArticles,
  previousAndNextPage,
  popularTagList,
  sitemapUrl,
  meta,
  mainContent,
  mainTitle,
  commonPageItems,
}: CommonProps) => {
  console.log('🚀 ~ file: index.tsx:75 ~ sitemapUrl:', sitemapUrl)
  console.log(
    "🚀 ~ file: index.tsx:75 ~ sitemapUrl.indexOf('p_') !== -1:",
    sitemapUrl.indexOf('p_') !== -1
  )

  const pageType = sitemapUrl
    ? sitemapUrl.indexOf('p_') !== -1
      ? 'content-page'
      : 'tag-page'
    : ''
  const metaComponent = (
    <Meta
      title={meta?.headTitle || process.env.NEXT_PUBLIC_TITLE}
      description={meta?.headDescription || process.env.NEXT_PUBLIC_DESCRIPTION}
      keywords={meta?.headKeyword || process.env.NEXT_PUBLIC_KEYWORDS}
      canonical={`${process.env.NEXT_PUBLIC_SITE}/${sitemapUrl}`}
    />
  )
  const contentPage = (
    <ContentPage
      mainContent={mainContent}
      popularTagList={popularTagList}
      previousAndNextPage={previousAndNextPage}
    />
  )
  const tagPage = (
    <Marketing
      openTitleName={`# ${mainTitle}`}
      commonPageItems={commonPageItems}
      sitemapUrl={sitemapUrl}
    />
  )

  const bottomPage = sitemapUrl ? (
    sitemapUrl.indexOf('p_') !== -1 ? (
      <ExtendReading contents={relatedArticles} />
    ) : (
      <PageTemplate />
    )
  ) : null
  const page = sitemapUrl
    ? sitemapUrl.indexOf('p_') !== -1
      ? contentPage
      : tagPage
    : null

  return (
    <Main
      meta={metaComponent}
      tags={popularTagList}
    >
      <TrendLayout
        pageType={pageType}
        tags={popularTagList}
        bottomPage={bottomPage}
      >
        {page}
      </TrendLayout>
    </Main>
  )
}

export default Page
