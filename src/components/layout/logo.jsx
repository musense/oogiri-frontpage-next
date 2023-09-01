import logo_main from '@assets/logo/oogiri_logo_main.svg';
import logo_alt from '@assets/logo/oogiri_logo_alt.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ type = 'main', position = "header" }) {
  const logo = type === 'main' ? logo_main : logo_alt

  return <Link className={`logo ${position}`} href={'/'}>
    <div>
      <Image
        title="Musense Marketing"
        src={logo.src}
        alt="Musense Marketing"
        width={202}
        height={40}
        style={{
          objectFit: 'cover'
        }}
      />
    </div>
  </Link>
}
