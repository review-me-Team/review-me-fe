import React, { FormEvent, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Textarea } from 'review-me-design-system';
import { useUserContext } from '@contexts/userContext';
import { usePostFeedbackReply } from '@apis/feedbackApi';
import { usePostQuestionReply } from '@apis/questionApi';
import { validateContent } from '@utils';
import { ReplyFormLayout } from '../style';

interface Props {
  type: 'feedback' | 'question';
  resumeId: number;
  parentId: number;
}

const ReplyAddForm = ({ type, resumeId, parentId }: Props) => {
  const { jwt, isLoggedIn } = useUserContext();
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [content, setContent] = useState<string>('');
  const { mutate: addFeedbackReply } = usePostFeedbackReply({ resumeId, parentId });
  const { mutate: addQuestionReply } = usePostQuestionReply({ resumeId, parentId });

  const resetForm = () => {
    setContent('');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!jwt) return;

    if (!validateContent(content)) {
      contentRef.current?.focus();
      return;
    }

    if (type === 'feedback')
      addFeedbackReply({ resumeId, parentFeedbackId: parentId, content: content.trim(), jwt });
    else if (type === 'question')
      addQuestionReply({ resumeId, parentQuestionId: parentId, content: content.trim(), jwt });

    resetForm();
  };

  return (
    <ReplyFormLayout onSubmit={handleSubmit}>
      <Textarea
        ref={contentRef}
        value={content}
        onChange={(e) => setContent(e.target.value.trim())}
        disabled={!isLoggedIn}
      />
      <Button type="submit" variant="default" size="s" disabled={!isLoggedIn}>
        작성
      </Button>
    </ReplyFormLayout>
  );
};

export default ReplyAddForm;
