import Image from 'next/image';

import LogoRectangle from '@/../public/logo-rectangle.png';

export default function Logo() {
  return <Image src={LogoRectangle} alt="Anime hub logo" />;
}
