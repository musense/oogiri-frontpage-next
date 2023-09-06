import React from 'react'
import Tag from './tag';
import { useAppContext } from "@store/context";

const HotTrendWrapper = ({
    pageType,
    bottomPage,
    position,
    popularTagList,
    children
}) => {
    const { state, dispatch } = useAppContext();
    const content = popularTagList && popularTagList.map((tag, index) => {
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
        contentBottom = state.viewContents && state.viewContents.length > 0
            ? contentBottom
            : null
    }

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
        {contentBottom}
    </div>
}

export default HotTrendWrapper