import React from "react";
import Banner from "../layout/Banner"
import NewsPage from "./../../components/NewsPage/NewsPage"
import HotPage from "./../../components/HotPage/HotPage"
import RecommendPage from "./../../components/RecommendPage/RecommendPage"

export default function Page({
    newsContents,
    hotContents,
    recommendContents
}) {

    return <div className="index-page">
        <div className="index-middle">
            <NewsPage contents={newsContents} />
            <HotPage contents={hotContents} />
        </div>
        <div className="index-bottom">
            <RecommendPage contents={recommendContents} />
        </div>
    </div>;
}
