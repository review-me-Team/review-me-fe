import React from 'react';
import FeedbackReply from '@components/Reply/FeedbackReply';
import ReplyAddForm from '@components/ReplyForm/ReplyAddForm';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { useUserContext } from '@contexts/userContext';
import { FeedbackReply as FeedbackReplyType, useFeedbackReplyList } from '@apis/feedbackApi';
import { ReplyListLayout } from '../style';

interface Props {
  parentId: number;
  resumeId: number;
}

const FeedbackReplyList = ({ parentId, resumeId }: Props) => {
  const { jwt } = useUserContext();

  const { data: feedbackReplyList, fetchNextPage: fetchNextFeedbackReplyList } = useFeedbackReplyList({
    resumeId,
    parentFeedbackId: parentId,
    enabled: true,
    jwt,
  });
  const { setTarget } = useIntersectionObserver({
    onIntersect: () => {
      fetchNextFeedbackReplyList();
    },
    options: {
      threshold: 0.5,
    },
  });

  const replies: FeedbackReplyType[] =
    feedbackReplyList?.pages.map((page) => page.feedbackComments).flat() || [];

  return (
    <ReplyListLayout>
      <ul>
        {replies.map((reply) => (
          <li key={reply.id}>
            <FeedbackReply resumeId={resumeId} {...reply} />
          </li>
        ))}
        <div ref={setTarget}></div>
      </ul>
      <ReplyAddForm type="feedback" resumeId={resumeId} parentId={parentId} />
    </ReplyListLayout>
  );
};

export default FeedbackReplyList;
