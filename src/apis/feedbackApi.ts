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
  content: string;
  commenterId: number;
  commenterName: string;
  commenterProfileUrl: string;
  labelContent: string;
  createdAt: string;
  countOfReplies: number;
  checked: boolean;
  emojis: Emoji[];
  myEmojiId: number;
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
}

export const useFeedbackList = ({ resumeId, resumePage }: UseFeedbackListProps) => {
  return useInfiniteQuery({
    queryKey: ['feedbackList', resumeId],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getFeedbackList({ resumeId, pageParam, resumePage }),
    getNextPageParam: (lastPage) => {
      const { pageNumber, lastPage: lastPageNum } = lastPage;

      return pageNumber < lastPageNum ? pageNumber + 1 : null;
    },
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
