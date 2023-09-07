import React, { useCallback, useEffect, useRef } from 'react';
import styles from './css/headerScrollLink.module.css'
import Link from 'next/link';
import navMap from './navMap'
import { useAppContext } from "@store/context";

const HeaderScrollLink = ({
  offset,
  href = '',
  to,
  name,
  className,
  disableScroll = false,
}) => {
  const { dispatch } = useAppContext();
  const destRef = useRef(null)

  useEffect(() => {
    if (!to) return
    destRef.current = document.querySelector(to)
  }, [to]);

  const scrollHandler = useCallback((e, destObject) => {
    if (!destObject) return
    if (disableScroll) return
    e.preventDefault()
    // console.log("🚀 ~ file: HeaderScrollLink.jsx:28 ~ scrollHandler ~ destObject:", destObject)
    const { top: destTop } = destObject.getBoundingClientRect()
    window.scrollBy({
      top: destTop + offset,
      behavior: 'smooth',
    })
  }, [offset, disableScroll]);

  const mainClassName = className ? styles[className] : styles['nav-button']

  return (
    <Link
      title={navMap.get(name).name.ch}
      onClick={(e) => scrollHandler(e, destRef.current)}
      href={href}
      className={mainClassName}
    >
      <div className={styles['nav-text-wrapper']}>
        <div>{navMap.get(name).name.ch}</div>
      </div>
    </Link>
  )
}

export default HeaderScrollLink