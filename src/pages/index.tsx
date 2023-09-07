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

type HomeProps = InferGetServerSidePropsType<typeof getServerSideProps>

export const getServerSideProps: GetServerSideProps = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL

  let payload = {
    apiUrl: apiUrl,
  }

  const newsContentsPromise = getNewsContents(payload)
  const hotContentsPromise = getHotContents(payload)
  const recommendContentsPromise = getRecommendContents(payload)
  const popularTagsPromise = getPopularTagList(payload)

  const { newsContents, hotContents, recommendContents, popularTags } =
    await Promise.all([
      newsContentsPromise,
      hotContentsPromise,
      recommendContentsPromise,
      popularTagsPromise,
    ]).then((res) => {
      const response = {
        newsContents: res[0],
        hotContents: res[1],
        recommendContents: res[2],
        popularTags: res[3],
      }
      // console.log('🚀 ~ file: index.tsx:39 ~ ]).then ~ response:', response)
      return response
    })

  return {
    props: {
      newsContents: newsContents,
      hotContents: hotContents,
      recommendContents: recommendContents,
      popularTags: popularTags,
    },
  }
}

const Home = ({
  newsContents,
  hotContents,
  recommendContents,
  popularTags,
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
      tags={popularTags}
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
