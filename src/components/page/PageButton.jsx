import React, { useCallback } from "react";
import { useRouter } from 'next/router';

export default function PageButton({ styles, label, value }) {
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

    const props = {
        onClick: () => onButtonClick(value),
        className: `page ${styles}`,
    }
    return (
        <button {...props}>
            {label}
        </button>
    )
}
