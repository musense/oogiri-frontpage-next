import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function useScrollToPosition() {
    const router = useRouter();

    // 在頁面渲染後設置滾動位置
    useEffect(() => {
        if (
            [
                'currentPage',
                'searchText',
                'previous'
            ].some(queryText => router.query[queryText] !== undefined)
        ) {
            const yOffset = 0
            const trendLayoutAnchor = document.querySelector('#trend-layout-anchor')
            const y = trendLayoutAnchor.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({
                top: y,
                behavior: 'smooth',
            })
            // trendLayoutAnchor.scrollIntoView({
            //     behavior: 'smooth',
            //     block: 'start'
            // })
            return
        }
    }, [router]);

    return null;
}
