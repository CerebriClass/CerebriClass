import { BankSvg, SearchAltSvg } from '@/assets';
import { HomeSvg } from '@/assets/HomeSvg';
import { Link } from '@/utils/types/Link';

export const useHeader = () => {
  const links: Link[] = [
    { label: '홈', to: '/', icon: HomeSvg },
    { label: '학습지 생성기', to: '/create-sheet', icon: SearchAltSvg },
    { label: '스토리보드?', to: '/about', icon: BankSvg },
  ];
  return { links };
};
