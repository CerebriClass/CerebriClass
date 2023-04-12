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
            <Text> ‘영어’는 무섭지 않다, 어렵지 않다</Text>
            <h2>
              <Text
                fontSize={theme.fonts.size.h2}
                fontWeight={theme.fonts.weight.bold}
              >
                스토리보드랩
              </Text>
            </h2>
          </VStack>

          <VStack align="start" spacing="1rem">
            <Text>
              한국은 그 어떠한 나라보다도 영어 교육에 시간을 많이 쏟는
              나라입니다. ‘국·영·수’를 지칭하는 필수 과목에 대한 표현에서부터도
              그것을 알 수 있죠. 초등학생, 중학생, 고등학생, 성인 말할 것도 없이
              대한민국 국민이라면 평생 영어를 배웁니다. 하지만 우리는 영어를
              무서워하고 어려워합니다. 왜냐고 물어보면 스토리보드랩은 두 가지
              이유를 꼽습니다.
            </Text>

            <ul style={{ marginLeft: '2rem' }}>
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
            </ul>

            <Text>
              우리 스토리보드랩은 한국의 고질적인 영어 교육 문제를 해결하고 위해
              나섰습니다. 저희는 두 가지 방식을 통해 해당 문제들을 해결하고자
              합니다.
            </Text>

            <ul style={{ marginLeft: '2rem' }}>
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
            </ul>
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
              학원과 학교에서는 획일화된 진도를 맞추기 위해 개개인이 어려워하는
              점들을 충족하지 못합니다. 저희는 학습자 각자의 약점과 부족한 점을
              개인별로 파악하여 이를 보강하려 합니다. 개인의 필요에 응답하는
              인공지능 기술력으로 저희는 문제를 출제하고 공부하고, 더 나아가서
              재밌게 학습할 수 있게 기회를 마련하고자 합니다.
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
              영어는 과목이기 이전에 영미권 국가의 사람들이 쓰는 영어와
              마찬가지로 한국인이 일상생활에 사용하는. 그렇기 때문에 직접 써보고
              그것에 대한 피드백을 얻는 것이 중요합니다. 저희는 학생들이 특정한
              주제에 대해 연습하고 그것을 발전시킬 수 있는 툴을 개발하고
              있습니다. 평소에 영어 연습을 재밌게 하고, 더 나아가 유익한
              피드백을 주면서 학생이 직접 영어를 쓰면서 자신의 실력을 보완할 수
              있게 하고자 합니다.
            </Text>
          </VStack>

          <Text>
            대한민국이 영어 강국이 되는 그날까지 스토리보드랩의 도전을 멈추지
            않습니다.
          </Text>
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
