import React from 'react';
import { Button, Textarea } from 'review-me-design-system';
import Comment from '@components/Comment';
import { ReplyForm, ReplyListLayout } from './style';

type Emoji = {
  id: number;
  count: number;
};

export interface Reply {
  id: number;
  parentId: number;
  content: string | null;
  commenterId: number;
  commenterName: string;
  commenterProfileUrl: string;
  createdAt: string;
  emojis: Emoji[];
  myEmojiId: number | null;
}

interface Props {
  type: 'feedback' | 'question' | 'comment';
  resumeId: number;
  replies: Reply[];
}

const ReplyList = ({ type, resumeId, replies }: Props) => {
  return (
    <ReplyListLayout>
      {replies.map((reply) => (
        <li key={reply.id}>
          <Comment type={type} resumeId={resumeId} {...reply} />
        </li>
      ))}
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
