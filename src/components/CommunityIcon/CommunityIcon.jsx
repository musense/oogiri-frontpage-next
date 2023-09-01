import React from "react";
import styles from './CommunityIcon.module.css'

export default function CommunityIcon({ type }) {
    return <div className={`${styles['icon']} ${styles[type]}`} />;
}