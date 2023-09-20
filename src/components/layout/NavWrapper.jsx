import React, { useCallback, useEffect, useRef } from 'react'
import HeaderScrollLink from './HeaderScrollLink';
import { useAppContext } from "@store/context";

export default function NavWrapper() {
  const { state } = useAppContext();

  const navRef = useRef(null);

  const navHandler = useCallback((e) => {
    e.preventDefault()
  }, [])
  const liHandler = useCallback((e) => {
    e.stopPropagation()
  }, [])

  const middleOffset = -120
  const bottomOffset = -120

  useEffect(() => {
    if (navRef.current === null) {
      return
    } else {
      navRef.current.addEventListener("touchstart", navHandler)
      navRef.current.addEventListener("wheel", navHandler)
      navRef.current.addEventListener("scroll", navHandler)
      navRef.current.addEventListener("touchmove", navHandler)
      const liList = navRef.current.querySelectorAll("li")
      liList.forEach(li => {
        li.addEventListener("touchstart", liHandler)
      })
    }
  }, [navRef, navHandler, liHandler]);

  return <nav ref={navRef}
  >
    <ul>
      <li>
        <HeaderScrollLink
          offset={middleOffset}
          href={`/#news`}
          to='#news'
          name='news' />
      </li>
      <li>
        <HeaderScrollLink
          offset={middleOffset}
          href={`/#hot`}
          to='#hot'
          name='hot' />
      </li>
      <li>
        <HeaderScrollLink
          offset={bottomOffset}
          href={`/#recommend`}
          to='#recommend'
          name='recommend' />
      </li>
      <li>
        <HeaderScrollLink
          offset={middleOffset}
          href={`/c_all_contents.html`}
          to='c_all_contents.html'
          name='allContents' />
      </li>
    </ul>
  </nav>;
}
