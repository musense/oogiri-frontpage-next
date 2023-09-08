import React, { useCallback } from "react";
import { useRouter } from 'next/router';
import styles from './pageTemplate.module.css'

export default function PageButton({ className, label, value }) {
    const router = useRouter();
    const onButtonClick = useCallback((value) => {
        const {
            sitemapUrl,
            ...currentQuery
        } = router.query;
        const updatedQuery = { ...currentQuery, currentPage: value };
        router.push({
            pathname: `/${router.query.sitemapUrl}`,
            query: updatedQuery,
        }, undefined, { scroll: false })
    }, [router])
    const classes = className.indexOf(' ') !== -1
        ? className.split(' ').map(c => styles[c])
        : styles[className]

    const props = {
        onClick: () => onButtonClick(value),
        className: typeof classes === 'string' ? `${styles['page']} ${classes}` : `${styles['page']} ${classes.join(' ')}`,
    }
    return (
        <button {...props}>
            {label}
        </button>
    )
}
