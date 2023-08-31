import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Main } from '@components/Main/Main'
import { Meta } from '@layouts/Meta'
import Index from '@components/index/index'
import { getTitleContents } from '@services/titleContents'

type HomeProps = InferGetServerSidePropsType<typeof getServerSideProps>

export const getServerSideProps: GetServerSideProps = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL

  let payload = {
    apiUrl: apiUrl,
  }

  const titleContents = await getTitleContents(payload)

  return {
    props: {
      titleContents: titleContents,
    },
  }
}

const Home = ({ titleContents }: HomeProps) => {
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
    >
      <Index titleContents={titleContents} />
    </Main>
  )
}

export default Home
