import { HStack, VStack } from '@/components/common';
import { Button } from '@/components/common/Button';
import { get, postJSON } from '@/utils/ky';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormType = {
  rawText: string;
};

type ResultType = {
  workSheetUrl: string;
  answerSheetUrl: string;
};

export const CreateWorkSheetPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();
  const [workSheetUrl, setWorkSheetUrl] = useState<string>('');
  const [answerSheetUrl, setAnswerSheetUrl] = useState<string>('');
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
      };
      setIsSubmitted(true);
      const json = (await postJSON(
        '/create-work-sheet',
        newData
      )) as ResultType;
      setWorkSheetUrl(json.workSheetUrl);
      setAnswerSheetUrl(json.answerSheetUrl);
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
        <HStack spacing="1rem">
          <FormRawTextInput {...register('rawText', { required: true })} />
          <input type="submit" />
        </HStack>
      </form>
      {isSubmitted && !isGenerated && <p>학습지 제작 중...</p>}
      {isGenerated && (
        <>
          <Button
            onClick={() => downloadFile(workSheetUrl, 'work-sheet')}
            element={<p>학습지 다운로드</p>}
          />
          <Button
            onClick={() => downloadFile(answerSheetUrl, 'answer-sheet')}
            element={<p>해설 다운로드</p>}
          />
        </>
      )}
    </VStack>
  );
};

const FormRawTextInput = styled.input`
  width: 50rem;
  padding: 0.5rem;
`;
