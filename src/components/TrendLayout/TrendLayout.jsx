import HotTrendWrapper from '@components/content/hotTrendWrapper';

export default function TrendLayout({ pageType, tags, bottomPage, children }) {

    return (
        <HotTrendWrapper
            pageType={pageType}
            bottomPage={bottomPage}
            popularTagList={tags} >
            {children}
        </HotTrendWrapper>
    )
}
