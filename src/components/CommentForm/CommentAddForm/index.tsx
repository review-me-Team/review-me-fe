import React, { FormEvent, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Textarea } from 'review-me-design-system';
import { useUserContext } from '@contexts/userContext';
import { usePostComment } from '@apis/commentApi';
import { ButtonWrapper, CommentFormLayout } from '../style';

interface Props {
  resumeId: number;
}

const CommentAddForm = ({ resumeId }: Props) => {
  const queryClient = useQueryClient();
  const { jwt } = useUserContext();

  const [content, setContent] = useState<string>('');

  const { mutate: addComment } = usePostComment();

  const resetForm = () => {
    setContent('');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!jwt || !resumeId || !content) return;

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
      <Textarea placeholder="댓글" value={content} onChange={(e) => setContent(e.target.value)} />
      <ButtonWrapper $type="add">
        <Button variant="default" size="s">
          작성
        </Button>
      </ButtonWrapper>
    </CommentFormLayout>
  );
};

export default CommentAddForm;
