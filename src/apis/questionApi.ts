import { useInfiniteQuery } from '@tanstack/react-query';
import { REQUEST_URL } from '@constants';
import { ApiResponse, PageNationData } from './response.types';
import { Emoji } from './utilApi';

export interface Question {
  id: number;
  content: string;
  commenterId: number;
  commenterName: string;
  commenterProfileUrl: string;
  labelContent: string;
  createdAt: string;
  countOfReplies: number;
  bookmarked: boolean;
  checked: boolean;
  emojis: Emoji[];
  myEmojiId: number;
}

type QuestionList = Question[];

interface GetQuestionList extends PageNationData {
  questions: QuestionList;
}

export const getQuestionList = async ({ resumeId, pageParam }: { resumeId: number; pageParam: number }) => {
  const response = await fetch(`${REQUEST_URL.RESUME}/${resumeId}/question?page=${pageParam}`);

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<GetQuestionList> = await response.json();

  return data;
};

interface UseQuestionListProps {
  resumeId: number;
}

export const useQuestionList = ({ resumeId }: UseQuestionListProps) => {
  return useInfiniteQuery({
    queryKey: ['questionList', resumeId],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getQuestionList({ resumeId, pageParam }),
    getNextPageParam: (lastPage) => {
      const { pageNumber, lastPage: lastPageNum } = lastPage;

      return pageNumber < lastPageNum ? pageNumber + 1 : null;
    },
  });
};
