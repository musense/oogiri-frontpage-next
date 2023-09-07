import React, { useEffect, useRef, useCallback } from "react";
import { useRouter } from 'next/router';
import styles from './ContentFilterInput.module.css'

export default function ContentsFilterInput() {
    const router = useRouter();
    const inputRef = useRef(null);

    const onButtonClick = () => {
        if (inputRef.current === null) return
        console.log("🚀 ~ file: ContentsFilterInput.jsx:13 ~ onButtonClick ~ inputRef.current.value:", inputRef.current.value)
        router.push(`/${router.query.sitemapUrl}?searchText=${inputRef.current.value}`
            , undefined, { scroll: false })
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onButtonClick();
        }
    }

    useEffect(() => {
        if (inputRef.current === null) {
            return
        } else {
            inputRef.current.focus();
        }

    }, [inputRef]);

    return <div className={styles['content-filter-container']}>
        <input
            className={styles['filter-input']}
            ref={inputRef}
            type="text"
            placeholder="入力..."
            onKeyDown={handleKeyPress}
        />
        <button className={styles['filter-button']} onClick={onButtonClick}>検索</button>
    </div>;
}
