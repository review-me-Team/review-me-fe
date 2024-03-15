import React, { FormEvent, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Label, Textarea } from 'review-me-design-system';
import { useUserContext } from '@contexts/userContext';
import { usePostFeedback } from '@apis/feedbackApi';
import { useLabelList } from '@apis/utilApi';
import { ButtonWrapper, FeedbackFormLayout, LabelList } from '../style';

interface Props {
  resumeId: number;
  resumePage: number;
}

const FeedbackAddForm = ({ resumeId, resumePage }: Props) => {
  const queryClient = useQueryClient();
  const { jwt } = useUserContext();

  const [labelId, setLabelId] = useState<number | undefined>();
  const [content, setContent] = useState<string>('');

  const { mutate: addFeedback } = usePostFeedback();
  const { data: labelList } = useLabelList();

  const resetForm = () => {
    setLabelId(undefined);
    setContent('');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!jwt || !resumeId || !content) return;

    addFeedback(
      {
        resumeId,
        content: content,
        labelId,
        resumePage,
        jwt,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ['feedbackList', resumeId, resumePage],
          });

          resetForm();
        },
      },
    );
  };

  return (
    <FeedbackFormLayout $type="add" onSubmit={handleSubmit}>
      <LabelList>
        {labelList?.map(({ id, label }) => {
          return (
            <Label
              key={id}
              isActive={labelId === id}
              py="0.25rem"
              px="0.75rem"
              onClick={() => setLabelId(id)}
            >
              {label}
            </Label>
          );
        })}
      </LabelList>
      <Textarea placeholder="피드백" value={content} onChange={(e) => setContent(e.target.value)} />
      <ButtonWrapper $type="add">
        <Button variant="default" size="s">
          작성
        </Button>
      </ButtonWrapper>
    </FeedbackFormLayout>
  );
};

export default FeedbackAddForm;
