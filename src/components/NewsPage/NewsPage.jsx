import React from "react";
import Card from "@components/Card/Card";
import HeaderScrollLink from "@components/layout/HeaderScrollLink";

export default function NewsPage({ contents }) {
    // console.log("🚀 ~ file: NewsPage.jsx:6 ~ NewsPage ~ contents:", contents)

    const content = contents.length > 0 ? contents.map((content, index) => {
        return <Card
            key={index}
            type="news"
            content={content} />
    }) : <h3>まだ記事がありません</h3>
    return (
        <div id="news" className='news-page'>
            {content}
            <HeaderScrollLink
                className="news-page"
                href={`/c_all_contents.html`}
                to='c_all_contents.html'
                name='allContents'
            />
        </div>
    )
}
