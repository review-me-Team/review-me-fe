import React from 'react';
import QuestionReply from '@components/Reply/QuestionReply';
import ReplyAddForm from '@components/ReplyForm/ReplyAddForm';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { useUserContext } from '@contexts/userContext';
import { QuestionReply as QuestionReplyType, useQuestionReplyList } from '@apis/questionApi';
import { ReplyListLayout } from '../style';

interface Props {
  parentId: number;
  resumeId: number;
}

const QuestionReplyList = ({ parentId, resumeId }: Props) => {
  const { jwt } = useUserContext();

  const { data: questionReplyList, fetchNextPage: fetchNextQuestionReplyList } = useQuestionReplyList({
    resumeId,
    parentQuestionId: parentId,
    enabled: true,
    jwt,
  });
  const { setTarget } = useIntersectionObserver({
    onIntersect: () => {
      fetchNextQuestionReplyList();
    },
    options: {
      threshold: 0.5,
    },
  });

  const replies: QuestionReplyType[] =
    questionReplyList?.pages.map((page) => page.questionComments).flat() || [];

  return (
    <ReplyListLayout>
      <ul>
        {replies.map((reply) => (
          <li key={reply.id}>
            <QuestionReply resumeId={resumeId} {...reply} />
          </li>
        ))}
        <div ref={setTarget}></div>
      </ul>
      <ReplyAddForm type="question" resumeId={resumeId} parentId={parentId} />
    </ReplyListLayout>
  );
};

export default QuestionReplyList;
