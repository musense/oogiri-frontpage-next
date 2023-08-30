import Head from 'next/head'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { AppConfig } from '@utils/AppConfig'

type IMetaProps = {
  title: string
  description: string
  keywords: string
  canonical?: string
}

const Meta = (props: IMetaProps) => {
  const router = useRouter()
  // console.log('🚀 ~ file: Meta.tsx:15 ~ Meta ~ router:', router);

  return (
    <>
      <Head>
        <meta
          charSet='UTF-8'
          key='charset'
        />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1'
          key='viewport'
        />
        <link
          rel='apple-touch-icon'
          href={`${router.basePath}/apple-touch-icon.png`}
          key='apple'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href={`${router.basePath}/favicon.ico`}
          key='icon32'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href={`${router.basePath}/favicon.ico`}
          key='icon16'
        />
        <link
          rel='icon'
          href={`${router.basePath}/favicon.ico`}
          key='favicon'
        />
      </Head>
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={props.canonical}
        openGraph={{
          type: 'website',
          title: props.title,
          description: props.description,
          url: props.canonical,
          locale: AppConfig.locale,
          site_name: AppConfig.site_name,
          images: [
            {
              url: `${router.basePath}/apple-touch-icon.png`,
              width: 32,
              height: 32,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
          handle: AppConfig.twitter_handle,
          site: AppConfig.site_name,
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: props.keywords,
          },
        ]}
      />
    </>
  )
}

export { Meta }
