import { Context } from '@store/context';
import '@styles/global.css';
import Script from 'next/script';
import localFont from 'next/font/local'
const tagFont = localFont({
  weight: '400',
  src: '../assets/fonts/tag/47214.ttf',
  variable: '--font-tag'
})
const titleFont = localFont({
  weight: '700',
  src: '../assets/fonts/title/GenJyuuGothicX-Monospace-Bold.ttf',
  variable: '--font-title'
})
const contentFont = localFont({
  src: [
    {
      path: '../assets/fonts/content/BIZUDGothic-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/content/BIZUDGothic-Bold.ttf',
      weight: 'bold',
      style: 'normal',
    },
  ],
  variable: '--font-content'
})

export default function MyApp({ Component, pageProps }) {

  return (
    <>
      <Script
        src='https://www.googletagmanager.com/gtag/js?id=G-BF1MZ6YJGH'
        strategy='afterInteractive'
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
      
            gtag('config', 'G-BF1MZ6YJGH');
        `}
      </Script>
      <Context>
        <div className={`
          ${tagFont.variable}
          ${titleFont.variable}
          ${contentFont.variable}`
        }>
          <Component {...pageProps} />
        </div>
      </Context>
    </>
  );
}
