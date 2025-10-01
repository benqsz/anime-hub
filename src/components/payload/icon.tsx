import Image from 'next/image';

import LogoCircle from '@/../public/logo-circle.png';

export default function Icon() {
  return <Image src={LogoCircle} width={32} height={32} alt="Anime hub icon" />;
}
