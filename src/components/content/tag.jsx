import Link from "next/link";
import React from "react";
import styles from "./css/tag.module.css"

export default function Tag({ href = '', tagName, icon = false, linkOn = true, footerLayout = false }) {

    const content = <span className={`
    ${styles['tag']} 
    ${icon ? styles['icon-tag'] : ''}
    ${footerLayout ? styles['footer-layout'] : ''}
    `} >{tagName}</span>
    return linkOn ? (
        <Link className="tag-link" style={{ lineHeight: '1' }} href={href}>
            {content}
        </Link>
    ) : content
}
