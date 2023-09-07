import React from 'react'
import Card from '@components/Card/Card';


export default function CardWrapper({ commonPageItems, styles }) {

    const content = commonPageItems && commonPageItems.length > 0
        ? commonPageItems.map((content, index) =>
            <Card
                key={index}
                type='tag-page'
                content={content}
            />)
        : <h3>{`まだ記事がありません`}</h3>

    return <div className={styles['card-wrapper']}>
        {content}
    </div>
}