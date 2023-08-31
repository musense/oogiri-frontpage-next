import React from "react";
import Card from "@components/Card/Card";

export default function HotPage({ contents }) {

    const content = contents.length > 0 && contents.map((content, index) => {
        return content.homeImagePath && (
            <Card
                key={index}
                type="hot"
                order={index + 1}
                content={content} />
        )
    })
    return (
        <div className='hot-page'>
            {content}
        </div>
    )
}
