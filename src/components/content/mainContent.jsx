import React, { useState, useEffect } from "react";
import useAddPageView from "@services/useAddPageView";
import formatDate from "@services/formatDate";
import PrevAndNextButton from "./PrevAndNextButton";
import Tag from "./tag";
import MainImage from "./mainImage";

export default function MainContent({
    content,
    prevInfo,
    nextInfo,
    isPreview
}) {

    // const contentTagsRef = useRef(null);
    // console.log("🚀 ~ file: mainContent.jsx:15 ~ MainContent ~ contentTagsRef:", contentTagsRef)

    // useResizeContentTags(contentTagsRef);
    // useAddPageView(content._id, isPreview);
    const [formattedDate, setFormattedDate] = useState();
    useEffect(() => {
        let date
        if (isPreview) {
            date = formatDate(content.updatedAt, 'jp')
        } else {
            date = formatDate(content.publishedAt, 'jp')
        }
        setFormattedDate(date)
    }, [content.publishedAt, content.updatedAt, isPreview]);

    const contentTags = content.tags && <div className="content-tags">{
        content.tags.map((tag, index) => {
            return <Tag
                key={index}
                href={tag.sitemapUrl}
                tagName={`# ${tag.name}`}
            />
        })}
    </div>

    return (
        <>
            <h1 className="content-title">
                {content.title}
            </h1>
            <div className="content-misc">
                <div className="content-date-wrapper">
                    {formattedDate}
                </div>
            </div>
            <MainImage
                imgSrc={content.contentImagePath}
                imgAltText={content.altText}
            />
            <div
                className="content-main-content"
                dangerouslySetInnerHTML={{ __html: content.htmlContent }}
            />
            {contentTags}
            <PrevAndNextButton
                prevInfo={prevInfo}
                nextInfo={nextInfo}
            />
        </>
    );


}
