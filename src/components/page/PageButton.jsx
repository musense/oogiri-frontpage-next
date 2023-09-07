import React, { useCallback } from "react";
import { useRouter } from 'next/router';
import { useAppContext } from "@store/context";

export default function PageButton({ styles, label, value }) {
    const router = useRouter();

    const handleClick = useCallback(() => {
        if (Number(value) === Number(router.query.currentPage)) return

        let route = router.query.sitemapUrl
        if (router.asPath.indexOf("?searchText") !== -1) {
            route = `/${route}?searchText=${router.query.searchText}&currentPage=${value}`
        } else {
            route = `/${route}?currentPage=${value}`
        }
        router.push(route)

    }, [router, value])

    const props = {
        onClick: handleClick,
        className: `page ${styles}`,
    }
    return (
        <button {...props}>
            {label}
        </button>
    )
}
