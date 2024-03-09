import React, { FormEvent, useState } from 'react';
import { Button, Textarea } from 'review-me-design-system';
import Reply, { ReplyType } from '@components/Comment/Reply';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { useUserContext } from '@contexts/userContext';
import { useFeedbackReplyList, usePostFeedbackReply } from '@apis/feedbackApi';
import { useQuestionReplyList } from '@apis/questionApi';
import { ReplyForm, ReplyListLayout } from './style';

interface Props {
  type: 'feedback' | 'question';
  parentId: number;
  resumeId: number;
}

const ReplyList = ({ type, parentId, resumeId }: Props) => {
  const { jwt, isLoggedIn } = useUserContext();
  const isAuthenticated = jwt && isLoggedIn;

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

  const [content, setContent] = useState<string>('');
  const { mutate: addFeedbackReply } = usePostFeedbackReply({ resumeId, parentId });

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

  const resetForm = () => {
    setContent('');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAuthenticated) return;
    if (content.length === 0) return;

    if (type === 'feedback') addFeedbackReply({ resumeId, parentFeedbackId: parentId, content, jwt });

    resetForm();
  };

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
      <ReplyForm onSubmit={handleSubmit}>
        <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
        <Button variant="default" size="s">
          작성
        </Button>
      </ReplyForm>
    </ReplyListLayout>
  );
};

export default ReplyList;
