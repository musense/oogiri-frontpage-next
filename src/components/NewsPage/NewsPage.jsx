import React from "react";
import Card from "@components/Card/Card";

export default function NewsPage({ contents }) {

    const content = contents.length > 0 && contents.map((content, index) => {
        return content.homeImagePath && (
            <Card
                key={index}
                type="news"
                content={content} />
        )
    })
    return (
        <div className='news-page'>
            {content}
        </div>
    )
}
