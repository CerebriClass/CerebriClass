export const useHeader = () => {
  const links = [
    { label: '홈', to: '/' },
    { label: '문제 만들기', to: '/create-workbook' },
  ];
  return { links };
};
