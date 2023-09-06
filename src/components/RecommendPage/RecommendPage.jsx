import React from "react";
import Card from "@components/Card/Card";

export default function RecommendPage({ contents }) {
    const content = contents.length > 0 && contents.map((content, index) => {
        return <Card
            key={index}
            type="recommend"
            content={content} />
    })
    return (
        <div id="recommend" className='recommend-page'>
            {content}
        </div>
    )
}
