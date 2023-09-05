import BtnMarketing from "@components/button/btnMarketing";
import { useAppContext } from "@store/context";

export default function PrevAndNextButton({
  prevInfo,
  nextInfo
}) {
  const { state } = useAppContext();

  const buttonProps = (info, isPrev) => ({
    to: info.sitemapUrl,
    className: isPrev ? 'prev' : 'next',
    cancelHoverState: state.clientWidth <= 768 ? true : false
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
