import { LogoSvg } from '@/assets';
import { Text, VStack } from '@/components/common';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet-async';

export const AboutPage = () => {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title>스토리보드랩 | Cerebri Class</title>
      </Helmet>
      <Layout>
        <ArticleLayout>
          <VStack align="start">
            <Text> ‘영어’ 무섭지 않다, 어렵지 않다</Text>
            <h2>
              <Text
                fontSize={theme.fonts.size.h2}
                fontWeight={theme.fonts.weight.bold}
              >
                스토리보드랩
              </Text>
            </h2>
          </VStack>

          <VStack align="start" spacing="2rem">
            <Text>
              초등학생, 중학생, 고등학생, 성인 가리지 않고 우리나라 국민이라면
              평생 영어를 배울 수밖에 없습니다. 대한민국은 다른 어떠한
              나라보다도 영어 교육에 시간을 많이 쏟는 나라라고 볼 수 있습니다.
              ‘국·영·수’를 지칭하는 필수 과목에 대한 표현도 이를 보여주고 있죠.
              하지만 우리는 영어에 대한 막연한 공포를 느끼고 있습니다. ‘왜?’라는
              질문에 스토리보드랩은 다음과 같이 두 가지 이유를 떠올렸습니다.
            </Text>

            <VStack w="100%" as="ul">
              <li>
                <Text
                  fontWeight={theme.fonts.weight.medium}
                  color={theme.colors.primary.default}
                >
                  1. 획일화된 영어 교육
                </Text>
              </li>
              <li>
                <Text
                  fontWeight={theme.fonts.weight.medium}
                  color={theme.colors.primary.default}
                >
                  2. 주입 중심의 영어 교육
                </Text>
              </li>
            </VStack>

            <Text>
              우리 스토리보드랩은 대한민국 영어교육이 가진 고질적인 문제를
              해결하고자 나섰습니다. 저희는 두 가지 방식을 통해 해당 문제들을
              해결하고자 합니다.
            </Text>

            <VStack w="100%" as="ul">
              <li>
                <Text
                  fontWeight={theme.fonts.weight.medium}
                  color={theme.colors.primary.default}
                >
                  1. 개인 맞춤의 영어 교육
                </Text>
              </li>
              <li>
                <Text
                  fontWeight={theme.fonts.weight.medium}
                  color={theme.colors.primary.default}
                >
                  2. 활용 중심의 영어 교육
                </Text>
              </li>
            </VStack>
          </VStack>

          <VStack align="start" spacing="1rem">
            <h3>
              <Text
                fontSize={theme.fonts.size.h3}
                fontWeight={theme.fonts.weight.bold}
              >
                개인 맞춤의 영어교육
              </Text>
            </h3>
            <Text>
              학원과 학교에서는 획일화된 진도를 맞추기 위해 학습자 개인이 갖은
              어려움을 해결해주지 못합니다. 저희는 학습자 개인의 약점과 부족한
              점을 개인별로 파악하여 이를 보강하려 합니다. 개인의 필요에
              응답하는 인공지능 기술력으로 저희는 문제를 출제하고 공부하고,
              추가로 이를 재밌게 학습할 수 있게 기회를 마련하고자 합니다.
            </Text>
          </VStack>
          <VStack align="start" spacing="1rem">
            <h3>
              <Text
                fontSize={theme.fonts.size.h3}
                fontWeight={theme.fonts.weight.bold}
              >
                활용 중심의 영어 교육
              </Text>
            </h3>
            <Text>
              영어는 과목이기 이전에, 한국인이 사용하는 한국어와 마찬가지로
              영미권 국가의 사람들이 일상에서 사용하는 언어입니다. 그렇기 때문에
              더더욱 직접 써보고 그것에 대한 피드백을 얻는 것에 초점을 맞추는
              것이 중요합니다. 저희는 학습자들이 필요로 하는 특정한 주제에 대해
              연습할 수 있도록, 그리고 그것을 더 발전시킬 수 있도록 도와주는
              툴을 개발하고 있습니다. 평소에 영어 학습을 재밌게 할 수 있고, 더
              나아가 유익한 피드백을 주면서 학습자가 직접 학습한 영어를 활용하며
              자신의 실력을 증진할 수 있게 하고자 합니다.
            </Text>
          </VStack>

          <LogoSvg />
        </ArticleLayout>
      </Layout>
    </>
  );
};

const Layout = styled(VStack)`
  justify-content: start;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-top: 5rem;
`;

const ArticleLayout = styled(VStack)`
  align-items: start;
  gap: 4rem;
  max-width: 40rem;
`;
