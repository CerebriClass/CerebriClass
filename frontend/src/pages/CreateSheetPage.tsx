import { DownloadSvg, EditSvg, LogoSvg } from '@/assets';
import { HStack, PrimaryText, Text, VStack } from '@/components/common';
import { Button } from '@/components/common/Button';
import { get, postJSON } from '@/utils/ky';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';

type FormType = {
  rawText: string;
  engWordQuiz: boolean;
  korWordQuiz: boolean;
  blankQuiz: boolean;
};

type ResultType = {
  sheetUrl: string;
};

export const CreateSheetPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();
  const [sheetUrl, setSheetUrl] = useState<string>('');
  const [isFulFilled, setIsFulFilled] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  const downloadFile = async (url: string, filename: string) => {
    const response = await get(url);
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${filename}.docx`;
    link.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const test = value
      .split(',')
      .map((word) => word.trim())
      .filter(Boolean);
    setIsFulFilled(5 <= test.length && test.length <= 15);
  };

  const onSubmit = async (data: FormType) => {
    try {
      const newData = {
        words: data.rawText
          .split(',')
          .map((word) => word.trim())
          .filter(Boolean),
        types: [
          data.engWordQuiz && 'eng_word_quiz',
          data.korWordQuiz && 'kor_word_quiz',
          data.blankQuiz && 'blank_quiz',
        ].filter(Boolean),
      };
      setIsSubmitted(true);
      const json = (await postJSON('/create-sheet', newData)) as ResultType;
      setSheetUrl(json.sheetUrl);
      setIsGenerated(true);
    } catch (e) {
      alert(e);
    }
  };
  return (
    <>
      <Helmet>
        <title>학습지 생성기 | Cerebri Class</title>
      </Helmet>
      <Layout>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing="3rem">
            <LogoSvg width="300px" height="70px" />
            <InputWrapper>
              <FormRawTextInput
                placeholder="쉼표로 구분하고 영어단어 5개 이상을 입력해주세요"
                {...register('rawText', {
                  required: true,
                  onChange: handleChange,
                })}
              />
              <Button
                type="submit"
                disabled={!isFulFilled}
                element={<SubmitButtonView disabled={!isFulFilled} />}
              />
            </InputWrapper>
            {!isSubmitted ? (
              <>
                <Text>
                  입력한{' '}
                  <PrimaryText fontWeight={700}>
                    영어단어를 바탕으로 최고의 영어 학습지를
                  </PrimaryText>{' '}
                  만들어 드릴게요 😀
                </Text>
                <VStack spacing="1rem">
                  <HStack spacing="1rem">
                    <input
                      type="checkbox"
                      {...register('engWordQuiz')}
                      defaultChecked={true}
                    />
                    <span>영어에 맞는 뜻 고르기</span>
                  </HStack>
                  <HStack spacing="1rem">
                    <input
                      type="checkbox"
                      {...register('korWordQuiz')}
                      defaultChecked={true}
                    />
                    <span>뜻에 맞는 영어 고르기</span>
                  </HStack>
                  <HStack spacing="1rem">
                    <input
                      type="checkbox"
                      {...register('blankQuiz')}
                      defaultChecked={true}
                    />
                    <span>빈칸 채우기</span>
                  </HStack>
                </VStack>
              </>
            ) : (
              <>
                {!isGenerated ? (
                  <>
                    <Text>잠시 기다려 주세요... 🤗</Text>
                    <img src="/loading.gif" />
                  </>
                ) : (
                  <>
                    <Text>완성했어요! 🥳</Text>
                    <Button
                      onClick={() => downloadFile(sheetUrl, 'worksheet')}
                      element={<DownloadButtonView />}
                    />
                  </>
                )}
              </>
            )}
          </VStack>
        </form>
      </Layout>
    </>
  );
};

const Layout = styled(VStack)`
  gap: 5rem;
  justify-content: flex-start;
  height: 100%;
  padding-top: 5rem;
`;

const FormRawTextInput = styled.input`
  all: unset;
  width: 50rem;
  padding: 0.5rem;
  ::placeholder {
    color: #c5c5c5;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 2.5px solid ${({ theme }) => theme.colors.primary.default};
  border-radius: 2rem;
  padding: 0.15rem 0.15rem 0.15rem 1rem;
`;

type SubmitButtonViewProps = {
  disabled: boolean;
};

const SubmitButtonView = ({ disabled }: SubmitButtonViewProps) => {
  const theme = useTheme();

  return (
    <SubmitButtonViewLayout
      style={{
        backgroundColor: disabled ? '#707070' : theme.colors.primary.default,
      }}
    >
      <EditSvg width="16px" fill="white" />
    </SubmitButtonViewLayout>
  );
};

const SubmitButtonViewLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
`;

const DownloadButtonView = () => {
  return (
    <DownloadButtonViewLayout>
      <HStack spacing="0.8rem">
        <DownloadSvg width="18px" fill="white" />
        <Text color="white">다운로드하기</Text>
      </HStack>
    </DownloadButtonViewLayout>
  );
};

const DownloadButtonViewLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1.5rem;
  border-radius: 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary.default};
`;
