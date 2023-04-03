import { HStack, VStack } from '@/components/common';
import { post } from '@/utils/ky';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormType = {
  word: string;
  count: number;
};

export const QuestionBlankPage = () => {
  const { register, handleSubmit } = useForm<FormType>();
  const [result, setResult] = useState<string>('');

  const onSubmit = async (data: FormType) => {
    const json = await post('/question/blank', data);
    setResult(JSON.stringify(json));
  };

  return (
    <VStack spacing="10rem">
      <VStack spacing="2rem">
        <h1>빈칸 채우기 문제 생성기</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing="1rem">
            <HStack spacing="1rem">
              <label>단어</label>
              <input {...register('word', { required: true })} />
            </HStack>
            <HStack spacing="1rem">
              <label>개수</label>
              <input
                type="number"
                defaultValue={1}
                {...register('count', { required: true })}
              />
            </HStack>
            <input type="submit" />
          </VStack>
        </form>
      </VStack>
      <VStack spacing="2rem">
        <h1>출력 결과</h1>
        <p>{result}</p>
      </VStack>
    </VStack>
  );
};
