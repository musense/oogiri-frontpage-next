import { type ReactNode } from 'react'
import HotTrendWrapper from '@components/content/hotTrendWrapper'
import { useAppContext } from '@store/context'
import useSetCommonPageItems from '@services/useSetCommonPageItems'

type TrendLayoutProps = {
  pageType: string
  itemPage: {
    currentPage: number
    totalPage: number
    totalCount: number
  }
  bottomPage: ReactNode
  children: ReactNode
}

export default function TrendLayout({
  pageType,
  itemPage,
  bottomPage,
  children,
}: TrendLayoutProps) {
  const { dispatch } = useAppContext()
  useSetCommonPageItems({
    itemPage,
    pageType,
    dispatch,
  })

  return (
    <HotTrendWrapper
      pageType={pageType}
      bottomPage={bottomPage}
    >
      {children}
    </HotTrendWrapper>
  )
}
