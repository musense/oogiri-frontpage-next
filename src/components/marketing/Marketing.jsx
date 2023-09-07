import React from "react";
import MarketingButtonList from '@components/marketing/marketingButtonList';
import CardWrapper from '@components/marketing/cardWrapper';
import ContentsFilterInput from '@components/ContentsFilterInput/contentsFilterInput';
import { useAppContext } from "@store/context";
import useInitial from "@services/useInitial";

export default function MarketingPage({
    openTitleName = '',
    commonPageItems,
    categoryList = null,
    sitemapUrl = '',
    itemPage,
    pageType,
}) {
    // console.log("🚀 ~ file: Marketing.jsx:17 ~ itemPage:", itemPage)
    // console.log("🚀 ~ file: Marketing.jsx:17 ~ commonPageItems:", commonPageItems)

    const { state, dispatch } = useAppContext();
    useInitial({ state, dispatch })

    const buttonList = <MarketingButtonList categoryList={categoryList} openTitleName={openTitleName} />
    const filterInput = <ContentsFilterInput />
    const cardWrapper = <CardWrapper commonPageItems={commonPageItems} />

    return (<>
        {/* {banner} */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            {buttonList}
            {pageType === 'all-content-page' && filterInput}
        </div>
        {cardWrapper}
        {/* {cardFooter} */}
    </>);
}



