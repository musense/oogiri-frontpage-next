import HeaderLayout from '@components/layout/headerLayout'
import ButtonLayout from '@components/layout/buttonLayout'
import FooterLayout from '@components/layout/footerLayout'
import Banner from '@components/layout/Banner'
import { createPortal } from 'react-dom'
import { useAppContext } from '@store/context'
import useModalRootRef from '@services/useModalRootRef'

export default function Layout({ tags, children }) {
  const { state } = useAppContext()
  const modalRoot = useModalRootRef()

  return (
    <>
      <HeaderLayout />
      <Banner />
      {state.clientWidth <= 768 && modalRoot &&
        createPortal(
          <ButtonLayout />,
          modalRoot
        )}
      {children}
      <FooterLayout tags={tags} pathname={state.pathname} />
    </>
  )
}
