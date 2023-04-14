import { LogoSvg } from '@/assets';
import { VStack } from '@/components/common';
import { Helmet } from 'react-helmet-async';

export const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>Cerebri Class</title>
      </Helmet>
      <VStack w="100%">
        <LogoSvg width="350px" />
      </VStack>
    </>
  );
};
