import React from 'react';
import QuestionReply from '@components/Reply/QuestionReply';
import ReplyAddForm from '@components/ReplyForm/ReplyAddForm';
import { useUserContext } from '@contexts/userContext';
import { QuestionReply as QuestionReplyType, useQuestionReplyList } from '@apis/questionApi';
import { MoreButton, ReplyListLayout } from '../style';

interface Props {
  parentId: number;
  resumeId: number;
}

const QuestionReplyList = ({ parentId, resumeId }: Props) => {
  const { jwt } = useUserContext();

  const {
    data: questionReplyList,
    fetchNextPage: fetchNextQuestionReplyList,
    hasNextPage,
  } = useQuestionReplyList({
    resumeId,
    parentQuestionId: parentId,
    jwt,
  });

  const replies: QuestionReplyType[] =
    questionReplyList?.pages.map((page) => page.questionComments).flat() || [];

  return (
    <ReplyListLayout>
      {hasNextPage && (
        <MoreButton
          onClick={() => {
            fetchNextQuestionReplyList();
          }}
        >
          더보기
        </MoreButton>
      )}
      <ul>
        {replies.map((reply) => (
          <li key={reply.id}>
            <QuestionReply resumeId={resumeId} {...reply} />
          </li>
        ))}
      </ul>
      <ReplyAddForm type="question" resumeId={resumeId} parentId={parentId} />
    </ReplyListLayout>
  );
};

export default QuestionReplyList;
