import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Meta } from '@layouts/Meta'
import { Main } from '@components/Main/Main'

import {
  getPreviousAndNextPageById,
  getMainContentBySitemapUrl,
  getPreviewContentByID,
} from '@services/titleContents'
import { getPopularTagList } from '@services/tagContents'

import ContentPage from '@components/content/ContentPage'
import Marketing from '@components/marketing/Marketing'
import TrendLayout from '@components/TrendLayout/TrendLayout'
import ExtendReading from '@components/content/extendReading'
import PageTemplate from '@components/page/pageTemplate'
import { getBanners } from '@services/bannerContents'

type CommonProps = InferGetServerSidePropsType<typeof getServerSideProps>

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const _id = params?._id as string
  console.log(
    '🚀 ~ file: index.tsx:23 ~ constgetServerSideProps:GetServerSideProps= ~ _id:',
    _id
  )
  const payload = {
    apiUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    _id: _id,
  }

  let promisePopularTagList, promiseBannerList

  try {
    const promiseMainContent = getPreviewContentByID(payload)
    const promisePreviousAndNextPage = new Promise((res) => {
      const response = {
        nextEditor: {
          _id: '123',
          sitemapUrl: '#',
          title:
            'パチンコ熱潮を巻き起こそう！独自のエンターテインメント体験を楽しんでください！',
        },
        previousEditor: {
          _id: '321',
          sitemapUrl: '#',
          title:
            'パチンコは娯楽ゲームだけでなく、文化現象であり、日本人の独自の創造力とエンターテインメント精神を象徴しています',
        },
      }

      res(response)
    })
    // const promiseRelatedArticles = getRelatedArticles(payload)
    promisePopularTagList = getPopularTagList(payload)
    promiseBannerList = getBanners(payload)

    const { mainContent, previousAndNextPage, popularTagList, bannerList } =
      await Promise.all([
        promiseMainContent,
        promisePreviousAndNextPage,
        promisePopularTagList,
        promiseBannerList,
      ]).then((res) => {
        // console.log('🚀 ~ file: index.tsx:160 ~ ]).then ~ res:', res)
        return {
          mainContent: res[0],
          previousAndNextPage: res[1],
          popularTagList: res[2],
          bannerList: res[3],
        }
      })

    return {
      props: {
        mainContent: mainContent,
        previousAndNextPage: previousAndNextPage,
        relatedArticles: [],
        bannerList: bannerList,
        popularTagList: popularTagList,
        meta: {
          headTitle: mainContent.headTitle,
          headDescription: mainContent.headDescription,
          headKeyword: mainContent.headKeyword,
        },
      },
    }
  } catch (error) {
    // Handle any errors during the data fetching process
    console.error('Error fetching data:', error)
    return {
      props: {
        mainContent: null,
        previousAndNextPage: null,
        relatedArticles: null,
        bannerList: null,
        popularTagList: null,
      },
    }
  }
}

const Page = ({
  previousAndNextPage,
  bannerList,
  popularTagList,
  sitemapUrl,
  meta,
  mainContent,
  itemPage,
}: CommonProps) => {
  // console.log('🚀 ~ file: index.tsx:185 ~ sitemapUrl:', sitemapUrl)

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

  const trendPage = contentPage

  return (
    <Main
      meta={metaComponent}
      bannerList={bannerList}
      popularTagList={popularTagList}
    >
      <TrendLayout
        pageType={'content-page'}
        bottomPage={null}
        itemPage={itemPage}
      >
        {trendPage}
      </TrendLayout>
    </Main>
  )
}

export default Page
