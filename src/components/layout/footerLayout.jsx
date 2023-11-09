import Tag from '@components/content/tag';
import CommunityIcon from '@components/CommunityIcon/CommunityIcon';
import styles from './css/footerLayout.module.css'

export default function FooterLayout({ popularTagList, pathname }) {
  console.log("🚀 ~ file: footerLayout.jsx:6 ~ FooterLayout ~ pathname:", pathname)

  const footerClass = pathname === "" || pathname === "/"
    ? 'index-footer'
    : pathname.indexOf('/p') !== -1
      ? 'content-footer'
      : 'tag-footer'

  return (
    <footer className={`${styles['footer-wrapper']} ${styles[footerClass]}`}>
      <div className={styles['footer-box']}>
        <div className={styles['top-side']}>
          {/* <CommunityIcon type={'twitter'} />
          <CommunityIcon type={'blog'} /> */}
          <CommunityIcon type={'trend-tags'} />
          {/* <CommunityIcon type={'facebook'} />
          <CommunityIcon type={'instagram'} /> */}
        </div>
        <div className={styles['bottom-side']}>
          {popularTagList && popularTagList.length > 0 && popularTagList.map((tag, index) => {
            return <Tag
              key={index}
              href={tag.sitemapUrl}
              tagName={`# ${tag.name}`}
              footerLayout
            />;
          })}
        </div>
      </div>
      <div className={styles['footer-copyright']}>
        <span>©2023 OOGIRI-info All rights reserved</span>
      </div>
    </footer>
  );
}


