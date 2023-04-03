import { HStack, VStack } from '@/components/common';
import { post } from '@/utils/ky';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormType = {
  word: string;
  count: number;
};

type ResultType = {
  result: string[];
};

export const QuestionBlankPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();
  const [results, setResults] = useState<string[]>([]);

  const onSubmit = async (data: FormType) => {
    const json = (await post('/question/blank', data)) as ResultType;
    setResults(json.result);
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
                {...register('count', { required: true, max: 10 })}
              />
            </HStack>
            {errors.word && <p>단어를 입력해주세요.</p>}
            {errors.count && <p>개수는 1~10만 가능합니다.</p>}
            <input type="submit" />
          </VStack>
        </form>
      </VStack>
      <VStack spacing="2rem">
        <h1>출력 결과</h1>
        <VStack align="start" spacing="1rem">
          {results.map((result, idx) => (
            <p key={idx}>{result}</p>
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
};
