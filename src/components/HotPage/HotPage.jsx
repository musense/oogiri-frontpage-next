import React from "react";
import Card from "@components/Card/Card";

export default function HotPage({ contents }) {

    const content = contents.length > 0 ? contents.map((content, index) => {
        return <Card
            key={index}
            type="hot"
            order={index + 1}
            content={content} />

    }) : <h3>まだ記事がありません</h3>
    return (
        <div id="hot" className='hot-page'>
            {content}
        </div>
    )
}
