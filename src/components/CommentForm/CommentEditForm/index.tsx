import React, { FormEvent, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Textarea } from 'review-me-design-system';
import { useUserContext } from '@contexts/userContext';
import { usePatchComment } from '@apis/commentApi';
import { validateContent } from '@utils';
import { ButtonWrapper, CommentFormLayout } from '../style';

interface Props {
  resumeId: number;
  commentId: number;
  initContent: string;
  onCancelEdit: () => void;
}

const CommentEditForm = ({ resumeId, commentId, initContent, onCancelEdit }: Props) => {
  const queryClient = useQueryClient();
  const { jwt } = useUserContext();

  const [content, setContent] = useState<string>(initContent);

  const contentRef = useRef<HTMLTextAreaElement>(null);

  const { mutate: editComment } = usePatchComment();

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

    editComment(
      {
        resumeId,
        commentId,
        content: content.trim(),
        jwt,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ['commentList', resumeId],
          });

          resetForm();
          onCancelEdit();
        },
      },
    );
  };

  return (
    <CommentFormLayout $type="edit" onSubmit={handleSubmit}>
      <Textarea ref={contentRef} value={content} onChange={(e) => setContent(e.target.value)} />
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
    </CommentFormLayout>
  );
};

export default CommentEditForm;
