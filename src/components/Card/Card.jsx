import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Card.module.css'
import Tag from '@components/content/tag';
import useFormatDate from '@services/useFormatDate';


export default function Card({
    type,
    order = '',
    content: data
}) {

    const maxShowTagNumber = 3
    const {
        homeImagePath,
        title,
        altText,
        publishedAt,
        sitemapUrl,
        htmlContent,
        tags,
    } = data;
    console.log("🚀 ~ file: card.jsx:15 ~ Card ~ sitemapUrl:", sitemapUrl)


    const tagNameArray = tags &&
        tags
            .reduce((acc, curr) => {
                return [...acc, curr.name]
            }, [])
            .slice(0, maxShowTagNumber)

    const route = {
        pathname: "/[sitemapUrl]",
        query: { sitemapUrl: sitemapUrl },
    }
    let content

    // const htmlString = makePTagSurrounded(htmlContent);

    const formattedPublishDate = useFormatDate(publishedAt)
    console.log("🚀 ~ file: Card.jsx:37 ~ formattedPublishDate:", formattedPublishDate)

    const cardContentIntro = (
        <div className={styles['card-content-intro']}>
            <div
                className="ellipsis"
                dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
    )
    switch (type) {
        case "tag-page": {
            content = <div className={styles['card-content']}>
                <div>
                    <span>{formattedPublishDate}</span>
                    {homeImagePath && <Image
                        className={styles['card-img']}
                        src={homeImagePath}
                        width={224}
                        height={127}
                        alt={altText || ''}
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            flexShrink: 0
                        }}
                    />}
                    {tagNameArray.map((tag, index) =>
                        <Tag
                            key={index}
                            tagName={tag}
                            linkOn={false}
                            icon />)
                    }
                </div>

                <div className={styles['card-info']}>
                    <div className={styles['card-title']}>
                        <span>{title}</span>
                    </div>
                    {cardContentIntro}
                    <div className={`${styles['card-more-button']} ${styles['button-flex-end']}`} />
                </div>
            </div>
        }
            break;
        case "news": {
            const { topSorting } = data
            console.log("🚀 ~ file: Card.jsx:91 ~ topSorting:", topSorting)
            content = <div className={`${styles['card-content']} ${topSorting ? styles['top-sorting'] : ''}`}>
                {homeImagePath && <Image
                    className={styles['card-img']}
                    src={homeImagePath}
                    width={224}
                    height={127}
                    alt={altText || ''}
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        flexShrink: 0
                    }}
                />}
                <div className={styles['card-info']}>
                    <div className={styles['card-title']}>
                        <span>{title}</span>
                    </div>
                    {cardContentIntro}
                    <div className={styles['card-more-button']} />
                </div>
            </div>
        }
            break;
        case "hot": {

            const orderClass = order ? `${styles['order']} ${styles[`order_${order}`]}` : ''
            content = <div className={`${styles['card-content']}  ${orderClass}`}>
                {homeImagePath && <Image
                    className={styles['card-img']}
                    src={homeImagePath}
                    width={258}
                    height={146}
                    alt={altText || ''}
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        flexShrink: 0
                    }}
                />}
                <div className={styles['card-info']}>
                    <div className={styles['card-title']}>
                        <span>{title}</span>
                    </div>
                    {cardContentIntro}
                </div>
            </div>
        }
            break;
        case "recommend": {
            content = <div className={styles['card-content']}>
                {homeImagePath && <Image
                    className={styles['card-img']}
                    src={homeImagePath}
                    width={271}
                    height={143}
                    alt={altText || ''}
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        flexShrink: 0
                    }}
                />}
                <div className={styles['card-info']}>
                    <div className={styles['card-title']}>
                        <span>{title}</span>
                    </div>
                    {cardContentIntro}
                    <div className={styles['card-more-button']} />
                </div>
            </div>
        }
            break;
        default:
            break;
    }

    // return homeImagePath && (
    return (
        <Link className={`${styles['card']} ${styles[type]}`} href={route}>
            {content}
        </Link >
    );
}
function makePTagSurrounded(htmlContent) {
    let html = htmlContent.split('');
    html.splice(0, 0, '<p>');
    html.splice(html.length, 0, '</p>');
    html = html.join('');
    return html;
}

