import React from "react";
import useAddPageView from "@services/useAddPageView";
import useFormatDate from "@services/useFormatDate";
import PrevAndNextButton from "./PrevAndNextButton";
import Tag from "./tag";

export default function MainContent({
    content,
    prevInfo,
    nextInfo,
    isPreview
}) {

    // const contentTagsRef = useRef(null);
    // console.log("🚀 ~ file: mainContent.jsx:15 ~ MainContent ~ contentTagsRef:", contentTagsRef)

    // useResizeContentTags(contentTagsRef);
    useAddPageView(content._id, isPreview);
    const formattedUpdateDate = useFormatDate(content.updatedAt, 'jp')
    const formattedPublishDate = useFormatDate(content.publishedAt, 'jp')

    const contentTags = content.tags && <div className="content-tags">{
        content.tags.map((tag, index) => {
            return <Tag
                key={index}
                href={tag.sitemapUrl}
                tagName={`# ${tag.name}`}
            />
        })}
    </div>
    const contentPublishedDate = isPreview
        ? formattedUpdateDate
        : formattedPublishDate

    return (
        <>
            <h1 className="content-title">
                {content.title}
            </h1>
            <div className="content-misc">
                <div className="content-date-wrapper">
                    {contentPublishedDate}
                </div>
            </div>
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
