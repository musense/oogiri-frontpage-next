import { useEffect } from "react";

export default function useSetCommonPageItems({
    pageType,
    itemPage,
    dispatch }) {

    useEffect(() => {
        if (['tag-page', 'all-content-page'].some(type => type === pageType)) {
            if (!itemPage?.currentPage) return
            dispatch({
                type: "INITIAL_PAGE_STATUS",
                payload: {
                    currentPage: itemPage.currentPage,
                    totalCount: itemPage.totalCount,
                    totalPage: itemPage.totalPage,
                }
            })
        }
    }, [
        pageType,
        itemPage?.currentPage,
        itemPage?.totalCount,
        itemPage?.totalPage,
        dispatch]);
}
