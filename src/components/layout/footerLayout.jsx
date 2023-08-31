import Tag from '@components/content/tag';
import { useAppContext } from "@store/context";

export default function FooterLayout({ tags }) {
  const { state, dispatch } = useAppContext();
  console.log("🚀 ~ file: footerLayout.jsx:6 ~ FooterLayout ~ state:", state)

  const footerClass = state.pathname === "" ? 'index-footer' : ''

  return (
    <footer className={`footer-wrapper ${footerClass}`}>
      <div className='footer-box'>
        <div className='top-side'>
          <div className="icon twitter" />
          <div className="icon blog" />
          <div className="trend-tags" />
          <div className="icon facebook" />
          <div className="icon instagram" />
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
