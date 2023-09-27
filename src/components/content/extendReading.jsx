import Link from "next/link";
import React from "react";
import Image from "next/image";
import styles from './css/extendReading.module.css'

export default function ExtendReading({ contents }) {
    return contents.length > 0 && <div data-title="延伸閱讀" className={styles['popular-content-container']}>
        <div className={styles['main-image']} />
        <div className={styles['popular-content-wrapper']}>
            <ExtendReadingContents contents={contents} />
        </div>
    </div>;
}

function ExtendReadingContents({ contents }) {
    // console.log("🚀 ~ file: extendReading.jsx:16 ~ ExtendReadingContents ~ contents:", contents)
    return contents.slice(0, 3).map((content, index) =>
        <Link key={index} href={content.sitemapUrl}
            className={styles['popular-content']}>
            <Content
                src={content.homeImagePath}
                alt={content.altText}
                title={content.title} />
        </Link>
    )
}

function Content({ src, alt, title }) {
    return <div>
        <Image
            src={src}
            alt={alt}
            width={336}
            height={190}
            className={styles['popular-content-image']}
            style={{
                objectFit: "cover",
                objectPosition: "center"
            }} />
        <div className={styles['popular-content-title']}>
            <span className="ellipsis">
                {title}
            </span>
        </div>
    </div>;
}