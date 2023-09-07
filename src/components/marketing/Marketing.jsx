import React from "react";
import MarketingButtonList from '@components/marketing/marketingButtonList';
import CardWrapper from '@components/marketing/cardWrapper';
import ContentsFilterInput from '@components/ContentsFilterInput/contentsFilterInput';
import { useAppContext } from "@store/context";
import useInitial from "@services/useInitial";
import styles from './Marketing.module.css'

export default function MarketingPage({
    openTitleName = '',
    commonPageItems,
    pageType,
}) {

    const { state, dispatch } = useAppContext();
    useInitial({ state, dispatch })

    const buttonList = <MarketingButtonList openTitleName={openTitleName} />
    const filterInput = <ContentsFilterInput />
    const cardWrapper = <CardWrapper commonPageItems={commonPageItems} styles={styles} />

    return (<>
        <div className={styles['marketing-page-top']}>
            {buttonList}
            {pageType === 'all-content-page' && filterInput}
        </div>
        {cardWrapper}
    </>);
}



