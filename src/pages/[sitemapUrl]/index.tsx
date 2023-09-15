import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Meta } from '@layouts/Meta'
import { Main } from '@components/Main/Main'

import {
  getRelatedArticles,
  getPreviousAndNextPageById,
  getMainContentBySitemapUrl,
  getPopularContents,
  getAllContents,
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
import { getBanners } from '@services/bannerContents'

type CommonProps = InferGetServerSidePropsType<typeof getServerSideProps>

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    sitemapUrl,
    currentPage = 1,
    searchText = '',
    previous,
  } = context.query

  let payload = {
    apiUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    sitemapUrl: `${process.env.NEXT_PUBLIC_TREND_SITE}/${sitemapUrl}`,
    _id: null,
    page: currentPage,
    categoryName: '',
    tagName: '',
    searchText: searchText,
  }

  let mainContent

  let promisePopularTagList, promiseBannerList

  if (sitemapUrl?.indexOf('p_') !== -1) {
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
    promisePopularTagList = getPopularTagList(payload)
    promiseBannerList = getBanners(payload)

    const { previousAndNextPage, relatedArticles, popularTagList, bannerList } =
      await Promise.all([
        promisePreviousAndNextPage,
        promiseRelatedArticles,
        promisePopularTagList,
        promiseBannerList,
      ]).then((res) => {
        // console.log('🚀 ~ file: index.tsx:160 ~ ]).then ~ res:', res)
        return {
          previousAndNextPage: res[0],
          relatedArticles: res[1],
          popularTagList: res[2],
          bannerList: res[3],
        }
      })

    return {
      props: {
        mainTitle: mainContent.name,
        mainContent: mainContent,
        previousAndNextPage: previousAndNextPage,
        relatedArticles: relatedArticles,
        bannerList: bannerList,
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
  //* special case
  if (sitemapUrl === 'c_all_contents.html') {
    mainContent = {
      name: '記事一覽',
    }
    // console.log('🚀 ~ file: index.tsx:31 ~ sitemapUrl:', sitemapUrl)
    const promiseAllContents = getAllContents(payload)
    promisePopularTagList = getPopularTagList(payload)
    promiseBannerList = getBanners(payload)

    const { allContents, popularTagList, bannerList } = await Promise.all([
      promiseAllContents,
      promisePopularTagList,
      promiseBannerList,
    ]).then((res) => {
      const response = {
        allContents: res[0],
        popularTagList: res[1],
        bannerList: res[2],
      }
      // console.log('🚀 ~ file: index.tsx:111 ~ ]).then ~ response:', response)
      return response
    })

    return {
      props: {
        mainTitle: mainContent.name,
        commonPageItems: allContents.data,
        sitemapUrl: sitemapUrl,
        bannerList: bannerList,
        popularTagList: popularTagList,
        itemPage: {
          currentPage: allContents.currentPage,
          totalPage: allContents.totalPages,
          totalCount: allContents.totalCount,
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
    promisePopularTagList = getPopularTagList(payload)
    promiseBannerList = getBanners(payload)

    const { tagItems, tagInfo, popularContents, popularTagList, bannerList } =
      await Promise.all([
        promiseTagItems,
        promiseTagInfo,
        promisePopularContents,
        promisePopularTagList,
        promiseBannerList,
      ]).then((res) => {
        // console.log('🚀 ~ file: index.tsx:145 ~ ]).then ~ res:', res)
        return {
          tagItems: res[0],
          tagInfo: res[1],
          popularContents: res[2],
          popularTagList: res[3],
          bannerList: res[4],
        }
      })

    return {
      props: {
        mainTitle: mainContent.name,
        commonPageItems: tagItems.data,
        sitemapUrl: sitemapUrl,
        popularContents: popularContents,
        bannerList: bannerList,
        popularTagList: popularTagList,
        itemPage: {
          currentPage: tagItems.currentPage,
          totalPage: tagItems.totalPages,
          totalCount: tagItems.totalCount,
        },
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
  bannerList,
  popularTagList,
  sitemapUrl,
  meta,
  mainContent,
  mainTitle,
  commonPageItems,
  itemPage,
}: CommonProps) => {
  // console.log('🚀 ~ file: index.tsx:185 ~ sitemapUrl:', sitemapUrl)

  const pageType = sitemapUrl
    ? sitemapUrl.indexOf('p_') !== -1
      ? 'content-page'
      : sitemapUrl.indexOf('tag_') !== -1
      ? 'tag-page'
      : 'all-content-page'
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

  // const tagPageTitle = pageType === 'tag-page' ? `# ${mainTitle}` : mainTitle
  // console.log('🚀 ~ file: index.tsx:221 ~ tagPageTitle:', tagPageTitle)
  const tagPage = (
    <Marketing
      openTitleName={mainTitle}
      commonPageItems={commonPageItems}
      pageType={pageType}
    />
  )

  const trendBottomLayout = pageType ? (
    pageType === 'content-page' ? (
      <ExtendReading contents={relatedArticles} />
    ) : (
      <PageTemplate />
    )
  ) : null
  // console.log('🚀 ~ file: index.tsx:223 ~ pageType:', pageType)

  const trendPage = pageType
    ? pageType === 'content-page'
      ? contentPage
      : tagPage
    : null

  return (
    <Main
      meta={metaComponent}
      bannerList={bannerList}
      popularTagList={popularTagList}
    >
      <TrendLayout
        pageType={pageType}
        bottomPage={trendBottomLayout}
        itemPage={itemPage}
      >
        {trendPage}
      </TrendLayout>
    </Main>
  )
}

export default Page
