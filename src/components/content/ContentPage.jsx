import React from "react";
import MainContent from '@components/content/mainContent';
import { useAppContext } from "@store/context";
import useInitial from "@services/useInitial";

export default function ContentPage({
    mainContent,
    previousAndNextPage,
    popularTagList,
    isPreview = false
}) {
    // console.log("🚀 ~ file: ContentPage.jsx:16 ~ mainContent:", mainContent)
    const { previousEditor, nextEditor } = previousAndNextPage;

    const { state, dispatch } = useAppContext();
    useInitial({ state, dispatch })

    return mainContent && (
        <MainContent
            content={mainContent}
            popularTagList={popularTagList}
            prevInfo={previousEditor}
            nextInfo={nextEditor}
            isPreview={isPreview}
        />
    )




}
