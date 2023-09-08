import React from "react";
import { useAppContext } from "@store/context";
import styles from './marketingButtonList.module.css'
import CommunityIcon from "@components/CommunityIcon/CommunityIcon";

export default function MarketingButtonList({
  pageType,
  openTitleName
}) {
  const { state } = useAppContext();

  const tagIcon = state.clientWidth <= 768 && pageType === 'tag-page'
    && <CommunityIcon type={'tagIconGreen'} />

  const titleName = state.clientWidth > 768 && pageType === 'tag-page'
    ? `# ${openTitleName}`
    : openTitleName

  return <div className={`${styles['content-list-page']} ${styles[pageType]}`} >
    {tagIcon}
    {titleName}
  </div>;
}
