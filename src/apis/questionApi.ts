import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { REQUEST_URL } from '@constants';
import { ApiResponse, PageNationData } from './response.types';

interface Emoji {
  id: number;
  count: number;
}

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

export const getQuestionList = async ({
  resumeId,
  pageParam,
  resumePage,
}: {
  resumeId: number;
  pageParam: number;
  resumePage: number;
}) => {
  const response = await fetch(
    `${REQUEST_URL.RESUME}/${resumeId}/question?page=${pageParam}&resumePage=${resumePage}`,
  );

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<GetQuestionList> = await response.json();

  return data;
};

interface UseQuestionListProps {
  resumeId: number;
  resumePage: number;
}

export const useQuestionList = ({ resumeId, resumePage }: UseQuestionListProps) => {
  return useInfiniteQuery({
    queryKey: ['questionList', resumeId],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getQuestionList({ resumeId, pageParam, resumePage }),
    getNextPageParam: (lastPage) => {
      const { pageNumber, lastPage: lastPageNum } = lastPage;

      return pageNumber < lastPageNum ? pageNumber + 1 : null;
    },
  });
};

// POST 예상 질문 추가
export const postQuestion = async ({
  resumeId,
  content,
  labelId,
  labelContent,
  resumePage,
}: {
  resumeId: number;
  content: string;
  labelId?: number;
  labelContent?: string;
  resumePage: number;
}) => {
  const formData = new FormData();
  formData.append('content', content);
  formData.append('resumePage', String(resumePage));
  if (labelId) formData.append('labelId', String(labelId));
  if (labelContent) formData.append('labelContent', labelContent);

  const response = await fetch(`${REQUEST_URL.RESUME}/${resumeId}/question`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw response;
  }

  const { data } = await response.json();

  return data;
};

export const usePostQuestion = () => {
  return useMutation({ mutationFn: postQuestion });
};
