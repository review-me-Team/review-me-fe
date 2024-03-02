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
}: {
  resumeId: number;
  content: string;
  labelId?: number;
  resumePage: number;
}) => {
  const formData = new FormData();
  formData.append('content', content);
  formData.append('resumePage', String(resumePage));
  if (labelId) formData.append('labelId', String(labelId));

  // todo: request headers에 authorization 추가하기
  const response = await fetch(`${REQUEST_URL.RESUME}/${resumeId}/feedback`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw response;
  }

  const { data } = await response.json();

  return data;
};

export const usePostFeedback = () => {
  return useMutation({ mutationFn: postFeedback });
};
