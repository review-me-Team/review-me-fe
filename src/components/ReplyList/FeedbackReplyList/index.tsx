import React from 'react';
import FeedbackReply from '@components/Reply/FeedbackReply';
import ReplyAddForm from '@components/ReplyForm/ReplyAddForm';
import { useUserContext } from '@contexts/userContext';
import { FeedbackReply as FeedbackReplyType, useFeedbackReplyList } from '@apis/feedbackApi';
import { MoreButton, ReplyListLayout } from '../style';

interface Props {
  parentId: number;
  resumeId: number;
}

const FeedbackReplyList = ({ parentId, resumeId }: Props) => {
  const { jwt } = useUserContext();

  const {
    data: feedbackReplyList,
    fetchNextPage: fetchNextFeedbackReplyList,
    hasNextPage,
  } = useFeedbackReplyList({
    resumeId,
    parentFeedbackId: parentId,
    jwt,
  });

  const replies: FeedbackReplyType[] =
    feedbackReplyList?.pages.map((page) => page.feedbackComments).flat() || [];

  return (
    <ReplyListLayout>
      {hasNextPage && (
        <MoreButton
          onClick={() => {
            fetchNextFeedbackReplyList();
          }}
        >
          더보기
        </MoreButton>
      )}
      <ul>
        {replies.map((reply) => (
          <li key={reply.id}>
            <FeedbackReply resumeId={resumeId} {...reply} />
          </li>
        ))}
      </ul>
      <ReplyAddForm type="feedback" resumeId={resumeId} parentId={parentId} />
    </ReplyListLayout>
  );
};

export default FeedbackReplyList;
