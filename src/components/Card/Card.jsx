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

    const {
        homeImagePath,
        title,
        altText,
        publishedAt,
        sitemapUrl,
        tags
    } = data;
    console.log("🚀 ~ file: card.jsx:15 ~ Card ~ sitemapUrl:", sitemapUrl)

    let htmlContent = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'

    const tagNameArray = tags && tags.reduce((acc, curr) => {
        return [...acc, curr.name]
    }, [])

    const route = {
        pathname: "/[sitemapUrl]",
        query: { sitemapUrl: sitemapUrl },
    }
    let content

    const formattedPublishDate = useFormatDate(publishedAt)
    console.log("🚀 ~ file: Card.jsx:37 ~ formattedPublishDate:", formattedPublishDate)
    switch (type) {
        case "tag-page": {
            content = <div className={styles['card-content']}>
                <div>
                    <span>{formattedPublishDate}</span>
                    <Image
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
                    />
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
                    <div className={styles['card-content-intro']}>
                        <div
                            className={`ellipsis ${styles['ellipsis']}`}
                            dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </div>
                    <div className={`${styles['card-more-button']} ${styles['button-flex-end']}`} />
                </div>
            </div>
        }
            break;
        case "news": {
            content = <div className={styles['card-content']}>
                <Image
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
                />
                <div className={styles['card-info']}>
                    <div className={styles['card-title']}>
                        <span>{title}</span>
                    </div>
                    <div className={styles['card-content-intro']}>
                        <div
                            className={'ellipsis'}
                            dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </div>
                    <div className={styles['card-more-button']} />
                </div>
            </div>
        }
            break;
        case "hot": {
            htmlContent = `<ol><li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id vero sequi magni acc<li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id vero sequi magni acc<li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id vero sequi magni acc</ol>`

            content = <div className={styles['card-content']}>
                <Image
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
                />
                <div className={styles['card-info']}>
                    <div className={styles['card-title']}>
                        <span>{title}</span>
                    </div>
                    <div className={styles['card-content-intro']}>
                        <div
                            className="ellipsis"
                            dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </div>
                </div>
            </div>
        }
            break;
        case "recommend": {
            content = <div className={styles['card-content']}>
                <Image
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
                />
                <div className={styles['card-info']}>
                    <div className={styles['card-title']}>
                        <span>{title}</span>
                    </div>
                    <div className={styles['card-content-intro']}>
                        <div
                            className="ellipsis"
                            dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </div>
                    <div className={styles['card-more-button']} />
                </div>
            </div>
        }
            break;
        default:
            break;
    }

    const orderClass = order ? `${styles['order']} ${styles[`order_${order}`]}` : ''
    return homeImagePath && (
        <Link className={`${styles['card']} ${styles[type]} ${orderClass}`} href={route}>
            {content}
        </Link >
    );
}
