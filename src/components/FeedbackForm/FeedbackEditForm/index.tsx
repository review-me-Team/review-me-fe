import React, { FormEvent, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Label, Textarea } from 'review-me-design-system';
import { useUserContext } from '@contexts/userContext';
import { usePatchFeedback } from '@apis/feedbackApi';
import { useLabelList } from '@apis/utilApi';
import { ButtonWrapper, FeedbackFormLayout, LabelList } from '../style';

interface Props {
  resumeId: number;
  resumePage: number;
  feedbackId: number;
  initLabelContent: string | null;
  initContent: string | null;
  onCancelEdit: () => void;
}

const FeedbackEditForm = ({
  resumeId,
  resumePage,
  feedbackId,
  initLabelContent,
  initContent,
  onCancelEdit,
}: Props) => {
  const queryClient = useQueryClient();
  const { jwt } = useUserContext();

  const { data: labelList } = useLabelList();
  const initLabelId = labelList?.find(({ label }) => label === initLabelContent)?.id;

  const [labelId, setLabelId] = useState<number | undefined>(initLabelId);
  const [content, setContent] = useState<string>(initContent || '');

  const contentRef = useRef<HTMLTextAreaElement>(null);

  const { mutate: editFeedback } = usePatchFeedback();

  const resetForm = () => {
    setLabelId(undefined);
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

    editFeedback(
      {
        resumeId,
        feedbackId,
        labelId,
        content: content.trim(),
        jwt,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ['feedbackList', resumeId, resumePage],
          });

          resetForm();
          onCancelEdit();
        },
      },
    );
  };

  return (
    <FeedbackFormLayout $type="edit" onSubmit={handleSubmit}>
      <LabelList>
        {labelList?.map(({ id, label }) => {
          return (
            <Label
              key={id}
              isActive={labelId === id}
              py="0.25rem"
              px="0.75rem"
              onClick={() => {
                const isLabelIdSameAsSelected = labelId === id;

                if (isLabelIdSameAsSelected) {
                  setLabelId(undefined);
                  return;
                }

                setLabelId(id);
              }}
            >
              {label}
            </Label>
          );
        })}
      </LabelList>
      <Textarea
        ref={contentRef}
        placeholder="피드백"
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
    </FeedbackFormLayout>
  );
};

export default FeedbackEditForm;
