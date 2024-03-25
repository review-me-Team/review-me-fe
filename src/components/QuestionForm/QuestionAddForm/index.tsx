import React, { FormEvent, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Input, Textarea } from 'review-me-design-system';
import { useUserContext } from '@contexts/userContext';
import { usePostQuestion } from '@apis/questionApi';
import { validateContent } from '@utils';
import { ButtonWrapper, KeywordLabel, QuestionFormLayout } from '../style';

interface Props {
  resumeId: number;
  resumePage: number;
}

const QuestionAddForm = ({ resumeId, resumePage }: Props) => {
  const queryClient = useQueryClient();
  const { jwt, isLoggedIn } = useUserContext();

  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [labelContent, setLabelContent] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const { mutate: addQuestion } = usePostQuestion();

  const resetForm = () => {
    setLabelContent('');
    setContent('');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!jwt || !resumeId) return;

    if (!validateContent(content)) {
      contentRef.current?.focus();
      return;
    }

    const hasLabelContent = labelContent.length > 0;

    addQuestion(
      {
        resumeId,
        content,
        labelContent: hasLabelContent ? labelContent : null,
        resumePage,
        jwt,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ['questionList', resumeId, resumePage],
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
        onChange={(e) => setLabelContent(e.target.value.trim())}
        disabled={!isLoggedIn}
      />
      <Textarea
        ref={contentRef}
        placeholder="예상질문"
        value={content}
        onChange={(e) => setContent(e.target.value.trim())}
        disabled={!isLoggedIn}
      />
      <ButtonWrapper $type="add">
        <Button variant="default" size="s" disabled={!isLoggedIn}>
          작성
        </Button>
      </ButtonWrapper>
    </QuestionFormLayout>
  );
};

export default QuestionAddForm;
