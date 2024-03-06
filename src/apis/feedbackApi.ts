import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { REQUEST_URL } from '@constants';
import { ApiResponse, PageNationData } from './response.types';

// GET 피드백 목록 조회
interface Emoji {
  id: number;
  count: number;
}

export interface Feedback {
  id: number;
  content: string | null;
  commenterId: number;
  commenterName: string;
  commenterProfileUrl: string;
  labelContent: string | null;
  createdAt: string;
  countOfReplies: number;
  checked: boolean;
  emojis: Emoji[];
  myEmojiId: number | null;
}

type FeedbackList = Feedback[];

interface GetFeedbackList extends PageNationData {
  feedbacks: FeedbackList;
}

export const getFeedbackList = async ({
  resumeId,
  pageParam,
  resumePage,
}: {
  resumeId: number;
  pageParam: number;
  resumePage: number;
}) => {
  const response = await fetch(
    `${REQUEST_URL.RESUME}/${resumeId}/feedback?page=${pageParam}&resumePage=${resumePage}`,
  );

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<GetFeedbackList> = await response.json();

  return data;
};

interface UseFeedbackListProps {
  resumeId: number;
  resumePage: number;
  enabled: boolean;
}

export const useFeedbackList = ({ resumeId, resumePage, enabled }: UseFeedbackListProps) => {
  return useInfiniteQuery({
    queryKey: ['feedbackList', resumeId, resumePage],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getFeedbackList({ resumeId, pageParam, resumePage }),
    getNextPageParam: (lastPage) => {
      const { pageNumber, lastPage: lastPageNum } = lastPage;

      return pageNumber < lastPageNum ? pageNumber + 1 : null;
    },
    enabled,
  });
};

// GET 피드백에 달린 댓글 조회
export interface FeedbackReply {
  id: number;
  parentFeedbackId: number;
  content: string;
  commenterId: number;
  commenterName: string;
  commenterProfileUrl: string;
  createdAt: string;
  emojis: Emoji[];
  myEmojiId: number | null;
}

interface GetFeedbackReplyList extends PageNationData {
  feedbackComments: FeedbackReply[];
}

export const getFeedbackReplyList = async ({
  resumeId,
  feedbackId,
  pageParam,
}: {
  resumeId: number;
  feedbackId: number;
  pageParam: number;
}) => {
  const response = await fetch(`${REQUEST_URL.RESUME}/${resumeId}/feedback/${feedbackId}?page=${pageParam}`);

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<GetFeedbackReplyList> = await response.json();

  return data;
};

interface UseFeedbackReplyListProps {
  resumeId: number;
  feedbackId: number;
  enabled: boolean;
}

export const useFeedbackReplyList = ({ resumeId, feedbackId, enabled }: UseFeedbackReplyListProps) => {
  return useInfiniteQuery({
    queryKey: ['feedbackReplyList', resumeId, feedbackId],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getFeedbackReplyList({ resumeId, feedbackId, pageParam }),
    getNextPageParam: (lastPage) => {
      const { pageNumber, lastPage: lastPageNum } = lastPage;

      return pageNumber < lastPageNum ? pageNumber + 1 : null;
    },
    enabled,
  });
};

// POST 피드백 작성
export const postFeedback = async ({
  resumeId,
  content,
  labelId,
  resumePage,
  jwt,
}: {
  resumeId: number;
  content: string;
  labelId?: number;
  resumePage: number;
  jwt: string;
}) => {
  const newFeedback: {
    content: string;
    resumePage: number;
    labelId?: number;
  } = {
    content,
    resumePage,
  };
  if (labelId) newFeedback['labelId'] = labelId;

  const response = await fetch(`${REQUEST_URL.RESUME}/${resumeId}/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(newFeedback),
  });

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<null> = await response.json();

  return data;
};

export const usePostFeedback = () => {
  return useMutation({ mutationFn: postFeedback });
};

// PATCH 피드백 이모지 수정
export const patchEmojiAboutFeedback = async ({
  resumeId,
  feedbackId,
  emojiId,
  jwt,
}: {
  resumeId: number;
  feedbackId: number;
  emojiId: number;
  jwt: string;
}) => {
  const response = await fetch(`${REQUEST_URL.RESUME}/${resumeId}/feedback/${feedbackId}/emoji`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ id: emojiId }),
  });

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<null> = await response.json();

  return data;
};

export const usePatchEmojiAboutFeedback = () => {
  return useMutation({ mutationFn: patchEmojiAboutFeedback });
};
