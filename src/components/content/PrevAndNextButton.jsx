import BtnMarketing from "@components/button/btnMarketing";
import { useAppContext } from "@store/context";
import hash from "@services/hash";
import { useRouter } from "next/router";
import React, { useMemo, useCallback } from "react";

export default function PrevAndNextButton({
  prevInfo,
  nextInfo
}) {
  const router = useRouter();
  const { state } = useAppContext();

  const onButtonClick = useCallback((direction) => {
    const {
      sitemapUrl,
      ...currentQuery
    } = router.query;
    const updatedQuery = { ...currentQuery, previous: hash(router.query.sitemapUrl).shortHash };
    router.push({
      pathname: direction,
      query: updatedQuery,
    }, undefined, { scroll: false })
  }, [router])

  const buttonProps = (info, isPrev) => ({
    to: info?.sitemapUrl,
    type: 'button',
    className: isPrev ? 'prev' : 'next',
    cancelHoverState: state.clientWidth <= 768 ? true : false,
    callback: () => onButtonClick(info.sitemapUrl)
  })

  return (
    <div className="btn-marketing-wrapper">
      {prevInfo &&
        <div className="title-btn prev">
          <span>{prevInfo.title}</span>
          <BtnMarketing {...buttonProps(prevInfo, true)} />
        </div>
      }
      {nextInfo &&
        <div className="title-btn next">
          <span>{nextInfo.title}</span>
          <BtnMarketing {...buttonProps(nextInfo, false)} />
        </div>
      }
    </div>
  );
}
