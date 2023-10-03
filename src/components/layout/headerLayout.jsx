import Logo from './logo';
import NavWrapper from './NavWrapper';
import { useAppContext } from "@store/context";
import { useEffect, useRef } from 'react';
import CommunityIcon from '@components/CommunityIcon/CommunityIcon';

export default function HeaderLayout() {
  const { state } = useAppContext();

  useEffect(() => {
    if (!localStorage.getItem('pathname')) {
      localStorage.setItem('pathname', window.location.pathname)
    } else if (window.location.pathname !== localStorage.getItem('pathname')) {
      localStorage.setItem('pathname', window.location.pathname)
    }
  }, []);

  return (
    <header>
      <Logo type={'main'} />
      {state.clientWidth > 768 && <div className={'navbar-icon'}>
        {/* <CommunityIcon type={'twitter'} />
        <CommunityIcon type={'blog'} />
        <CommunityIcon type={'facebook'} />
        <CommunityIcon type={'instagram'} /> */}
      </div>}
      <div className={'navbar-wrapper'}>
        <NavWrapper />
      </div>
    </header>
  );
}





