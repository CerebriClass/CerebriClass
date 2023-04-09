import { HStack, VStack } from '@/components/common';
import { Button } from '@/components/common/Button';
import { get, postJSON } from '@/utils/ky';
import styled from '@emotion/styled';
import { useState } from 'react';
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
    <VStack align="start" spacing="1rem">
      <h2>단어 입력(콤마로 구분)</h2>
      <p>
        ex) sustainable, typical, attribute, consumption, integration,
        constitutional, neural, diverse, proverb, misguided, absolute, expert
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="1rem">
          <FormRawTextInput {...register('rawText', { required: true })} />
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
          <input type="submit" />
        </VStack>
      </form>
      {isSubmitted && !isGenerated && <p>학습지 제작 중...</p>}
      {isGenerated && (
        <Button
          onClick={() => downloadFile(sheetUrl, 'worksheet')}
          element={<p>학습지 다운로드</p>}
        />
      )}
    </VStack>
  );
};

const FormRawTextInput = styled.input`
  width: 50rem;
  padding: 0.5rem;
`;
