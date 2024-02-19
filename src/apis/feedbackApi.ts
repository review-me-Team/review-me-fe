import { useInfiniteQuery } from '@tanstack/react-query';
import { REQUEST_URL } from '@constants';
import { ApiResponse, PageNationData } from './response.types';
import { Emoji } from './utilApi';

// GET 피드백 목록 조회
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

export const getFeedbackList = async ({ resumeId, pageParam }: { resumeId: number; pageParam: number }) => {
  const response = await fetch(`${REQUEST_URL.RESUME}/${resumeId}/feedback?page=${pageParam}`);

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<GetFeedbackList> = await response.json();

  return data;
};

interface UseFeedbackListProps {
  resumeId: number;
}

export const useFeedbackList = ({ resumeId }: UseFeedbackListProps) => {
  return useInfiniteQuery({
    queryKey: ['feedbackList', resumeId],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getFeedbackList({ resumeId, pageParam }),
    getNextPageParam: (lastPage) => {
      const { pageNumber, lastPage: lastPageNum } = lastPage;

      return pageNumber < lastPageNum ? pageNumber + 1 : null;
    },
  });
};
