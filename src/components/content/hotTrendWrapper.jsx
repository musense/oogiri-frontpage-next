import React from 'react'
import Tag from './tag';
import { useAppContext } from "@store/context";

const HotTrendWrapper = ({
    pageType,
    bottomPage,
    children
}) => {
    const { state } = useAppContext();
    const content = state.popularTagList && state.popularTagList.map((tag, index) => {
        return <Tag
            key={index}
            href={tag.sitemapUrl}
            tagName={`# ${tag.name}`}
        />;
    })
    let contentBottom = (
        <div className={`content-bottom`}>
            {bottomPage}
        </div>
    )
    if (pageType === 'tag-page') {
        contentBottom = state.totalCount > 0
            ? contentBottom
            : null
    }

    return <div className={`trend-layout ${pageType}`}>
        <div className={'content-top'}>
            <div className={`content-left-side`}>
                {children}
            </div>
            <div className={`content-right-side`}>
                <div className="hot-trend" />
                <div className="hot-tag-wrapper">
                    {content}
                </div>
            </div>
        </div>
        {contentBottom}
    </div>
}

export default HotTrendWrapper