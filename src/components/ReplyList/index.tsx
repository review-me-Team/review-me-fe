import React from 'react';
import Reply, { ReplyType } from '@components/Comment/Reply';
import ReplyAddForm from '@components/ReplyForm/ReplyAddForm';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { useUserContext } from '@contexts/userContext';
import { useFeedbackReplyList } from '@apis/feedbackApi';
import { useQuestionReplyList } from '@apis/questionApi';
import { ReplyListLayout } from './style';

interface Props {
  type: 'feedback' | 'question';
  parentId: number;
  resumeId: number;
}

const ReplyList = ({ type, parentId, resumeId }: Props) => {
  const { jwt } = useUserContext();

  const { data: feedbackReplyList, fetchNextPage: fetchNextFeedbackReplyList } = useFeedbackReplyList({
    resumeId,
    parentFeedbackId: parentId,
    enabled: type === 'feedback',
    jwt,
  });
  const { data: questionReplyList, fetchNextPage: fetchNextQuestionReplyList } = useQuestionReplyList({
    resumeId,
    parentQuestionId: parentId,
    enabled: type === 'question',
    jwt,
  });
  const { setTarget } = useIntersectionObserver({
    onIntersect: () => {
      if (type === 'feedback') fetchNextFeedbackReplyList();
      if (type === 'question') fetchNextQuestionReplyList();
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
      <ReplyAddForm type={type} resumeId={resumeId} parentId={parentId} />
    </ReplyListLayout>
  );
};

export default ReplyList;
