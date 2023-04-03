export const useHeader = () => {
  const links = [
    { label: '홈', to: '/' },
    { label: '빈칸', to: '/question/blank' },
    { label: '유의어', to: '/question/synonym' },
    { label: 'PDF 제작', to: '/make-pdf' },
  ];
  return { links };
};
