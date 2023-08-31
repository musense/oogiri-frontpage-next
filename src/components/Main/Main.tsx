import { type ReactNode } from 'react'
import Layout from '@components/Navbar/Layout'

type IMainProps = {
  meta: ReactNode
  tags: Array<{}>
  children: ReactNode
}

function Main({ meta, tags, children }: IMainProps) {
  return (
    <div className='w-full'>
      {meta}
      <div className='mx-auto'>
        <Layout tags={tags}>
          <main className='z-10 main-container'>{children}</main>
        </Layout>
      </div>
    </div>
  )
}

export { Main }
