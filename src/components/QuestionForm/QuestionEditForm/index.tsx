import React, { FormEvent, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Input, Textarea } from 'review-me-design-system';
import { useUserContext } from '@contexts/userContext';
import { usePatchQuestion } from '@apis/questionApi';
import { ButtonWrapper, KeywordLabel, QuestionFormLayout } from '../style';

interface Props {
  resumeId: number;
  resumePage: number;
  questionId: number;
  initLabelContent: string | null;
  initContent: string | null;
  onCancelEdit: () => void;
}

const QuestionEditForm = ({
  resumeId,
  resumePage,
  questionId,
  initLabelContent,
  initContent,
  onCancelEdit,
}: Props) => {
  const queryClient = useQueryClient();
  const { jwt } = useUserContext();

  const [labelContent, setLabelContent] = useState<string>(initLabelContent || '');
  const [content, setContent] = useState<string>(initContent || '');

  const contentRef = useRef<HTMLTextAreaElement>(null);

  const { mutate: editQuestion } = usePatchQuestion();

  const resetForm = () => {
    setLabelContent('');
    setContent('');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!jwt) return;

    const hasContent = content.trim().length > 0;

    if (!hasContent) {
      contentRef.current?.focus();
      return;
    }

    editQuestion(
      {
        resumeId,
        questionId,
        labelContent: labelContent.trim(),
        content: content.trim(),
        jwt,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ['questionList', resumeId, resumePage],
          });

          resetForm();
          onCancelEdit();
        },
      },
    );
  };

  return (
    <QuestionFormLayout $type="edit" onSubmit={handleSubmit}>
      <KeywordLabel>{labelContent}</KeywordLabel>
      <Input
        placeholder="예상질문 키워드"
        value={labelContent}
        onChange={(e) => setLabelContent(e.target.value)}
      />
      <Textarea
        ref={contentRef}
        placeholder="예상질문"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <ButtonWrapper $type="edit">
        <Button
          variant="outline"
          size="s"
          onClick={(e) => {
            e.preventDefault();
            onCancelEdit();
          }}
        >
          취소
        </Button>
        <Button variant="default" size="s">
          수정
        </Button>
      </ButtonWrapper>
    </QuestionFormLayout>
  );
};

export default QuestionEditForm;
