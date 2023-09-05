import React from 'react'
import Tag from './tag';

const HotTrendWrapper = ({
    pageType,
    bottomPage,
    position,
    popularTagList,
    children
}) => {

    const content = popularTagList && popularTagList.map((tag, index) => {
        return <Tag
            key={index}
            href={tag.sitemapUrl}
            tagName={`# ${tag.name}`}
        />;
    })

    return <div className={`trend-layout ${pageType}`}>
        <div className={'content-top'}>
            <div className={`content-left-side`}>
                {children}
            </div>
            <div className={`content-right-side ${position}`}>
                <div className="hot-trend" />
                <div className="hot-tag-wrapper">
                    {content}
                </div>
            </div>
        </div>
        <div className={`content-bottom`}>
            {bottomPage}
        </div>
    </div>
}

export default HotTrendWrapper