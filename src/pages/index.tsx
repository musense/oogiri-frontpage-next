import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Main } from '@components/Main/Main'
import { Meta } from '@layouts/Meta'
import Index from '@components/index/index'
import {
  getHotContents,
  getNewsContents,
  getRecommendContents,
} from '@services/titleContents'
import { getPopularTagList } from '@services/tagContents'
import { getBanners } from '@services/bannerContents'

type HomeProps = InferGetServerSidePropsType<typeof getServerSideProps>

export const getServerSideProps: GetServerSideProps = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL

  let payload = {
    apiUrl: apiUrl,
  }

  const bannerListPromise = getBanners(payload)
  const newsContentsPromise = getNewsContents(payload)
  const hotContentsPromise = getHotContents(payload)
  const recommendContentsPromise = getRecommendContents(payload)
  const popularTagListPromise = getPopularTagList(payload)

  const {
    bannerList,
    newsContents,
    hotContents,
    recommendContents,
    popularTagList,
  } = await Promise.all([
    bannerListPromise,
    newsContentsPromise,
    hotContentsPromise,
    recommendContentsPromise,
    popularTagListPromise,
  ]).then((res) => {
    const response = {
      bannerList: res[0],
      newsContents: res[1],
      hotContents: res[2],
      recommendContents: res[3],
      popularTagList: res[4],
    }
    // console.log('🚀 ~ file: index.tsx:39 ~ ]).then ~ response:', response)
    return response
  })

  return {
    props: {
      bannerList: bannerList,
      newsContents: newsContents,
      hotContents: hotContents,
      recommendContents: recommendContents,
      popularTagList: popularTagList,
    },
  }
}

const Home = ({
  newsContents,
  hotContents,
  recommendContents,
  bannerList,
  popularTagList,
}: HomeProps) => {
  return (
    <Main
      meta={
        <Meta
          title={process.env.NEXT_PUBLIC_TITLE || ''}
          description={process.env.NEXT_PUBLIC_DESCRIPTION || ''}
          keywords={process.env.NEXT_PUBLIC_KEYWORDS || ''}
          canonical={process.env.NEXT_PUBLIC_SITE}
        />
      }
      bannerList={bannerList}
      popularTagList={popularTagList}
    >
      <Index
        newsContents={newsContents}
        hotContents={hotContents}
        recommendContents={recommendContents}
      />
    </Main>
  )
}

export default Home
