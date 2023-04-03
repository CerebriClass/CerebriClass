import { Header } from '@/components/elements/Header';
import styled from '@emotion/styled';

export const MainLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Header />
      <PageWrapper>{children}</PageWrapper>
    </>
  );
};

const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 5rem;
  padding-top: 2rem;
`;
