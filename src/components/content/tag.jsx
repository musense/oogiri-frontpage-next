import Link from "next/link";
import React from "react";

export default function Tag({ href = '', tagName }) {
    return (
        <Link style={{ lineHeight: '1' }} href={href}>
            <span className="tag" >{tagName}</span>
        </Link>
    );
}
