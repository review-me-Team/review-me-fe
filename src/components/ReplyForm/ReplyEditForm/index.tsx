import React, { FormEvent, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Textarea } from 'review-me-design-system';
import { useUserContext } from '@contexts/userContext';
import { usePatchFeedback } from '@apis/feedbackApi';
import { usePatchQuestion } from '@apis/questionApi';
import { ButtonsContainer, ReplyFormLayout } from '../style';

interface Props {
  type: 'feedback' | 'question';
  resumeId: number;
  parentId: number;
  id: number;
  onCancelEdit: () => void;
}

const ReplyEditForm = ({ type, resumeId, parentId, id, onCancelEdit }: Props) => {
  const { jwt } = useUserContext();
  const queryClient = useQueryClient();
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [content, setContent] = useState<string>('');
  const { mutate: editFeedbackReply } = usePatchFeedback();
  const { mutate: editQuestionReply } = usePatchQuestion();

  const resetForm = () => {
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

    if (type === 'feedback') {
      editFeedbackReply(
        { resumeId, feedbackId: id, content: content.trim(), jwt },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feedbackReplyList', resumeId, parentId] });
            resetForm();
            onCancelEdit();
          },
        },
      );
    } else if (type === 'question') {
      editQuestionReply(
        { resumeId, questionId: id, content: content.trim(), jwt },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['questionReplyList', resumeId, parentId] });
            resetForm();
            onCancelEdit();
          },
        },
      );
    }
  };

  return (
    <ReplyFormLayout onSubmit={handleSubmit}>
      <Textarea ref={contentRef} value={content} onChange={(e) => setContent(e.target.value)} />
      <ButtonsContainer>
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
      </ButtonsContainer>
    </ReplyFormLayout>
  );
};

export default ReplyEditForm;
