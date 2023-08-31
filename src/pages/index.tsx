import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Main } from '@components/Main/Main'
import { Meta } from '@layouts/Meta'
import Index from '@components/index/index'
import { getTitleContents } from '@services/titleContents'
import { getPopularTagList } from '@services/tagContents'

type HomeProps = InferGetServerSidePropsType<typeof getServerSideProps>

export const getServerSideProps: GetServerSideProps = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL

  let payload = {
    apiUrl: apiUrl,
  }

  const titleContentsPromise = getTitleContents(payload)
  const popularTagsPromise = getPopularTagList(payload)

  const { titleContents, popularTags } = await Promise.all([
    titleContentsPromise,
    popularTagsPromise,
  ]).then((res) => {
    const response = {
      titleContents: res[0],
      popularTags: res[1],
    }
    console.log('🚀 ~ file: index.tsx:62 ~ ]).then ~ response:', response)
    return response
  })

  return {
    props: {
      titleContents: titleContents,
      popularTags: popularTags,
    },
  }
}

const Home = ({ titleContents, popularTags }: HomeProps) => {
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
      <Index titleContents={titleContents} />
    </Main>
  )
}

export default Home
