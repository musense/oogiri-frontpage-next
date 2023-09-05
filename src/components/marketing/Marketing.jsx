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
    const cardWrapper = <CardWrapper commonPageItems={commonPageItems} />
    // const cardFooter = <PageWrapper sitemapUrl={sitemapUrl} />

    return (<>
        {/* {banner} */}
        {buttonList}
        {cardWrapper}
        {/* {cardFooter} */}
    </>);
}

