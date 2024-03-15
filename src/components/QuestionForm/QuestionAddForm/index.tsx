import React, { FormEvent, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Input, Textarea } from 'review-me-design-system';
import { useUserContext } from '@contexts/userContext';
import { usePostQuestion } from '@apis/questionApi';
import { ButtonWrapper, KeywordLabel, QuestionFormLayout } from '../style';

interface Props {
  resumeId: number;
  currentPageNum: number;
}

const QuestionForm = ({ resumeId, currentPageNum }: Props) => {
  const queryClient = useQueryClient();
  const { jwt } = useUserContext();

  const [labelContent, setLabelContent] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const { mutate: addQuestion } = usePostQuestion();

  const resetForm = () => {
    setLabelContent('');
    setContent('');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!jwt || !resumeId || !content) return;

    addQuestion(
      {
        resumeId,
        content,
        labelContent: labelContent.trim(),
        resumePage: currentPageNum,
        jwt,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ['questionList', resumeId, currentPageNum],
          });

          resetForm();
        },
      },
    );
  };

  return (
    <QuestionFormLayout $type="add" onSubmit={handleSubmit}>
      <KeywordLabel>{labelContent}</KeywordLabel>
      <Input
        placeholder="예상질문 키워드"
        value={labelContent}
        onChange={(e) => setLabelContent(e.target.value)}
      />
      <Textarea placeholder="예상질문" value={content} onChange={(e) => setContent(e.target.value)} />
      <ButtonWrapper $type="add">
        <Button variant="default" size="s">
          작성
        </Button>
      </ButtonWrapper>
    </QuestionFormLayout>
  );
};

export default QuestionForm;
