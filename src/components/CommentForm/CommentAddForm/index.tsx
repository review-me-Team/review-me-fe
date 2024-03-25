import React, { FormEvent, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Textarea } from 'review-me-design-system';
import { useUserContext } from '@contexts/userContext';
import { usePostComment } from '@apis/commentApi';
import { validateContent } from '@utils';
import { ButtonWrapper, CommentFormLayout } from '../style';

interface Props {
  resumeId: number;
}

const CommentAddForm = ({ resumeId }: Props) => {
  const queryClient = useQueryClient();
  const { jwt, isLoggedIn } = useUserContext();

  const [content, setContent] = useState<string>('');

  const contentRef = useRef<HTMLTextAreaElement>(null);

  const { mutate: addComment } = usePostComment();

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

    addComment(
      {
        resumeId,
        content,
        jwt,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ['commentList', resumeId],
          });

          resetForm();
        },
      },
    );
  };

  return (
    <CommentFormLayout $type="add" onSubmit={handleSubmit}>
      <Textarea
        ref={contentRef}
        placeholder="댓글"
        value={content}
        onChange={(e) => setContent(e.target.value.trim())}
        disabled={!isLoggedIn}
      />
      <ButtonWrapper $type="add">
        <Button type="submit" variant="default" size="s" disabled={!isLoggedIn}>
          작성
        </Button>
      </ButtonWrapper>
    </CommentFormLayout>
  );
};

export default CommentAddForm;
