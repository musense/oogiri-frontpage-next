import React from "react";
import Banner from "./../../components/Banner/Banner"
import NewsPage from "./../../components/NewsPage/NewsPage"
import HotPage from "./../../components/HotPage/HotPage"
import RecommendPage from "./../../components/RecommendPage/RecommendPage"

export default function Page({ titleContents }) {

    const newContents = titleContents.slice(0, 6)
    const hotContents = titleContents.slice(6, 6 + 5)
    const recommendContents = titleContents.slice(11, titleContents.length)

    return <div className="index-page">
        <div className="index-top">
            <Banner />
        </div>
        <div className="index-middle">
            <NewsPage contents={newContents} />
            <HotPage contents={hotContents} />
        </div>
        <div className="index-bottom">
            <RecommendPage contents={recommendContents} />
        </div>
    </div>;
}
