import type { ReactNode } from 'react'
import HeaderLayout from '@components/layout/headerLayout'
// import ButtonLayout from '@components/layout/buttonLayout'
import FooterLayout from '@components/layout/footerLayout'
import Banner from '@components/layout/Banner'
// import { createPortal } from 'react-dom'
import { useAppContext } from '@store/context'
// import useModalRootRef from '@services/useModalRootRef'
import { PopularTagType } from '@store/types'

type LayoutProps = {
  popularTagList: PopularTagType[]
  children: ReactNode
}

export default function Layout({ popularTagList, children }: LayoutProps) {
  const { state } = useAppContext()
  // const modalRoot = useModalRootRef()

  return (
    <>
      <HeaderLayout />
      <Banner />
      {/* {state.clientWidth <= 768 &&
        modalRoot &&
        createPortal(<ButtonLayout />, modalRoot)} */}
      {children}
      <FooterLayout
        popularTagList={popularTagList}
        pathname={state.pathname}
      />
    </>
  )
}
