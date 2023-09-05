import React, { useMemo, useCallback } from "react";
import { useAppContext } from "@store/context";
import BtnMarketingWrapperByClientWidth from './BtnMarketingWrapperByClientWidth'
import {
  CommonTitle
} from "./marketingButtonElements";

export default function MarketingButtonList({
  categoryList,
  openTitleName
}) {

  // const { state } = useAppContext();

  // const showCategoryList = useMemo(() => {
  //   if (!categoryList) return null
  //   return categoryList.filter(category => category.keyName !== 'Uncategorized')
  // }, [categoryList])

  // const btnActive = useCallback((name) => {
  //   if (!state.categoryName) return false
  //   return name === state.categoryName
  // }, [state.categoryName])

  return <CommonTitle openTitleName={openTitleName} />
  // return <BtnMarketingWrapperByClientWidth
  //   clientWidth={state.clientWidth}
  //   openTitleName={openTitleName}
  //   showCategoryList={showCategoryList}
  //   btnActive={btnActive}
  // />
}
