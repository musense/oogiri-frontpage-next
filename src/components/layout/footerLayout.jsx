import Tag from '@components/content/tag';
import CommunityIcon from '@components/CommunityIcon/CommunityIcon';

export default function FooterLayout({ popularTagList, pathname }) {
  // console.log("🚀 ~ file: footerLayout.jsx:6 ~ FooterLayout ~ pathname:", pathname)

  pathname
  const footerClass = pathname === ""
    ? 'index-footer'
    : pathname.indexOf('/tag_') !== -1
      ? 'tag-footer'
      : 'all-content-footer'

  return (
    <footer className={`footer-wrapper ${footerClass}`}>
      <div className='footer-box'>
        <div className='top-side'>
          {/* <CommunityIcon type={'twitter'} />
          <CommunityIcon type={'blog'} /> */}
          <CommunityIcon type={'trend-tags'} />
          {/* <CommunityIcon type={'facebook'} />
          <CommunityIcon type={'instagram'} /> */}
        </div>
        <div className='bottom-side'>
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
    </footer>
  );
}


