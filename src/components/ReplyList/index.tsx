import React from 'react';
import { Button, Textarea } from 'review-me-design-system';
import Reply, { ReplyType } from '@components/Comment/Reply';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { useFeedbackReplyList } from '@apis/feedbackApi';
import { useQuestionReplyList } from '@apis/questionApi';
import { ReplyForm, ReplyListLayout } from './style';

interface Props {
  type: 'feedback' | 'question';
  parentId: number;
  resumeId: number;
}

const ReplyList = ({ type, parentId, resumeId }: Props) => {
  const { data: feedbackReplyList, fetchNextPage: fetchNextFeedbackList } = useFeedbackReplyList({
    resumeId,
    feedbackId: parentId,
    enabled: type === 'feedback',
  });
  const { data: questionReplyList, fetchNextPage: fetchNextQuestionList } = useQuestionReplyList({
    resumeId,
    questionId: parentId,
    enabled: type === 'question',
  });
  const { setTarget } = useIntersectionObserver({
    onIntersect: () => {
      if (type === 'feedback') fetchNextFeedbackList();
      if (type === 'question') fetchNextQuestionList();
    },
    options: {
      threshold: 0.5,
    },
  });

  let replies: ReplyType[] = [];

  if (type === 'feedback' && feedbackReplyList)
    replies = feedbackReplyList.pages
      .map((page) => page.feedbackComments)
      .flat()
      .map((reply) => ({ ...reply, parentId: reply.parentFeedbackId }));
  if (type === 'question' && questionReplyList)
    replies = questionReplyList.pages
      .map((page) => page.questionComments)
      .flat()
      .map((reply) => ({ ...reply, parentId: reply.parentQuestionId }));

  return (
    <ReplyListLayout>
      <ul>
        {replies.map((reply) => (
          <li key={reply.id}>
            <Reply type={type} resumeId={resumeId} {...reply} />
          </li>
        ))}
        <div ref={setTarget}></div>
      </ul>
      <ReplyForm>
        <Textarea placeholder="댓글" />
        <Button variant="default" size="s">
          작성
        </Button>
      </ReplyForm>
    </ReplyListLayout>
  );
};

export default ReplyList;
