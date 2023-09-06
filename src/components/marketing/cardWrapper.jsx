import React from 'react'
import Card from '@components/Card/Card';
import { useAppContext } from "@store/context";
import useSetCommonPageItems from "@services/useSetCommonPageItems";

export default function CardWrapper({ commonPageItems }) {
    const { state, dispatch } = useAppContext();
    useSetCommonPageItems(commonPageItems, dispatch)

    const content = state.viewContents && state.viewContents.length > 0
        ? state.viewContents.map((content, index) =>
            <Card
                key={index}
                type='tag-page'
                content={content}
            />)
        : <h3>{`まだ記事がありません`}</h3>

    return <div className={'card-wrapper'}>
        {content}
    </div>
}