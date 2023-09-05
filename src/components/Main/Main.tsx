import { type ReactNode } from 'react'
import Layout from '@components/Navbar/Layout'

import localFont from 'next/font/local'
const tagFont = localFont({
  weight: '400',
  src: './../../assets/fonts/tag/47214.ttf',
  variable: '--font-tag',
})
const titleFont = localFont({
  weight: '700',
  src: './../../assets/fonts/title/GenJyuuGothicX-Monospace-Bold.ttf',
  variable: '--font-title',
})
const contentFont = localFont({
  src: [
    {
      path: './../../assets/fonts/content/BIZUDGothic-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './../../assets/fonts/content/BIZUDGothic-Bold.ttf',
      weight: 'bold',
      style: 'normal',
    },
  ],
  variable: '--font-content',
})

type IMainProps = {
  meta: ReactNode
  tags: Array<{}>
  children: ReactNode
}

function Main({ meta, tags, children }: IMainProps) {
  return (
    <main
      className={`z-10 main-container 
      ${tagFont.variable} 
      ${titleFont.variable} 
      ${contentFont.variable}`}
    >
      {meta}
      <Layout tags={tags}>{children}</Layout>
    </main>
  )
}

export { Main }
