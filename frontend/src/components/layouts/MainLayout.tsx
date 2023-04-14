import { Header } from '@/components/elements/Header';
import styled from '@emotion/styled';
import { VStack } from '../common';

export const MainLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Header />
      <PageWrapper>
        <VStack w="100%" h="100%">
          {children}
        </VStack>
      </PageWrapper>
      <StartupStationLogoPositioner>
        <img
          src="/startup-station-logo.png"
          width="140px"
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
          }}
        />
      </StartupStationLogoPositioner>
    </>
  );
};

const PageWrapper = styled.main`
  width: 100%;
  height: 100%;
  padding-top: 4rem;
  background-color: ${({ theme }) => theme.colors.background};
`;

const StartupStationLogoPositioner = styled.span`
  position: sticky;
  bottom: 0;
  right: 0;
`;
