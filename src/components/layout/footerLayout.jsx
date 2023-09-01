import Tag from '@components/content/tag';
import { useAppContext } from "@store/context";
import CommunityIcon from '@components/CommunityIcon/CommunityIcon';

export default function FooterLayout({ tags }) {
  const { state } = useAppContext();
  console.log("🚀 ~ file: footerLayout.jsx:6 ~ FooterLayout ~ state:", state)

  const footerClass = state.pathname === "" ? 'index-footer' : ''

  return (
    <footer className={`footer-wrapper ${footerClass}`}>
      <div className='footer-box'>
        <div className='top-side'>
          <CommunityIcon type={'twitter'} />
          <CommunityIcon type={'blog'} />
          <CommunityIcon type={'trend-tags'} />
          <CommunityIcon type={'facebook'} />
          <CommunityIcon type={'instagram'} />
        </div>
        <div className='bottom-side'>
          {tags && tags.length > 0 && tags.map((tag, index) => {
            return <Tag
              key={index}
              href={tag.sitemapUrl}
              tagName={`# ${tag.name}`}
            />;
          })}
        </div>
      </div>
    </footer>
  );
}


