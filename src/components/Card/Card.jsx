import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Card.module.css'

export default function Card({ type, order = '', content: data }) {

    const {
        homeImagePath,
        title,
        altText,
        publishedAt,
        sitemapUrl,

    } = data;
    console.log("🚀 ~ file: card.jsx:15 ~ Card ~ sitemapUrl:", sitemapUrl)

    let htmlContent = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
    const route = {
        pathname: "/[sitemapUrl]",
        query: { sitemapUrl: sitemapUrl },
    }

    let content
    switch (type) {
        case "news": {
            content = <div>
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
                />
                }
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
        case "hot": {
            htmlContent = `<ol><li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id vero sequi magni acc<li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id vero sequi magni acc<li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id vero sequi magni acc</ol>`

            content = <div>
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
            content = <div>
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
                />
                }
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
    return (
        <Link className={`${styles['card']} ${styles[type]} ${orderClass}`} href={route}>
            {content}
        </Link >
    );
}
