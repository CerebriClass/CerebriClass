import { BankSvg, SearchAltSvg } from '@/assets';
import { Link } from '@/utils/types/Link';

export const useHeader = () => {
  const links: Link[] = [
    { label: '학습지 생성기', to: '/create-sheet', icon: SearchAltSvg },
    { label: '스토리보드?', to: '/about', icon: BankSvg },
  ];
  return { links };
};
