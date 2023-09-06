import React from "react";
import MarketingButtonList from '@components/marketing/marketingButtonList';
import CardWrapper from '@components/marketing/cardWrapper';
import PopularArticles from '@components/marketing/popularArticles';
import PageWrapper from '@components/marketing/PageWrapper';
import { useAppContext } from "@store/context";

import MarketingBanner from "./marketingBanner";
import useInitial from "@services/useInitial";

export default function MarketingPage({
    openTitleName = '',
    commonPageItems,
    categoryList = null,
    sitemapUrl = '',
}) {
    const { state, dispatch } = useAppContext();
    useInitial({ state, dispatch })

    // const banner = sitemapUrl === '' && <MarketingBanner />
    const buttonList = <MarketingButtonList categoryList={categoryList} openTitleName={openTitleName} />
    const filterInput = <input type="text" placeholder="Search..." />
    const cardWrapper = <CardWrapper commonPageItems={commonPageItems} />
    // const cardFooter = <PageWrapper sitemapUrl={sitemapUrl} />

    return (<>
        {/* {banner} */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            {buttonList}
            {state.pathname.indexOf('/tag_') === -1 && filterInput}
        </div>
        {cardWrapper}
        {/* {cardFooter} */}
    </>);
}

