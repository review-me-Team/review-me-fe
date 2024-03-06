import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { REQUEST_URL } from '@constants';
import { ApiResponse, PageNationData } from './response.types';

interface Emoji {
  id: number;
  count: number;
}

// bookmarked는 이력서 글쓴이가 작성한 댓글일 경우에 오는 데이터
export interface Question {
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
  bookmarked?: boolean;
}

type QuestionList = Question[];

// GET 예상질문 목록 조회
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
  enabled: boolean;
}

export const useQuestionList = ({ resumeId, resumePage, enabled }: UseQuestionListProps) => {
  return useInfiniteQuery({
    queryKey: ['questionList', resumeId, resumePage],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getQuestionList({ resumeId, pageParam, resumePage }),
    getNextPageParam: (lastPage) => {
      const { pageNumber, lastPage: lastPageNum } = lastPage;

      return pageNumber < lastPageNum ? pageNumber + 1 : null;
    },
    enabled,
  });
};

// GET 예상질문에 달린 댓글 조회
interface QuestionReply {
  id: number;
  parentQuestionId: number;
  content: string;
  commenterId: number;
  commenterName: string;
  commenterProfileUrl: string;
  createdAt: string;
  emojis: Emoji[];
  myEmojiId: number | null;
}

interface GetQuestionReplyList extends PageNationData {
  questionComments: QuestionReply[];
}

export const getQuestionReplyList = async ({
  resumeId,
  questionId,
  pageParam,
}: {
  resumeId: number;
  questionId: number;
  pageParam: number;
}) => {
  const response = await fetch(`${REQUEST_URL.RESUME}/${resumeId}/question/${questionId}?page=${pageParam}`);

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<GetQuestionReplyList> = await response.json();

  return data;
};

interface UseQuestionReplyListProps {
  resumeId: number;
  questionId: number;
  enabled: boolean;
}

export const useQuestionReplyList = ({ resumeId, questionId, enabled }: UseQuestionReplyListProps) => {
  return useInfiniteQuery({
    queryKey: ['questionReplyList', resumeId, questionId],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getQuestionReplyList({ resumeId, questionId, pageParam }),
    getNextPageParam: (lastPage) => {
      const { pageNumber, lastPage: lastPageNum } = lastPage;

      return pageNumber < lastPageNum ? pageNumber + 1 : null;
    },
    enabled,
  });
};

// GET 예상 질문 라벨 목록 조회
interface QuestionLabel {
  id: number;
  label: string;
}

interface GetQuestionLabelList {
  labels: QuestionLabel[];
}

export const getQuestionLabelList = async ({ resumeId }: { resumeId: number }) => {
  const response = await fetch(`${REQUEST_URL.RESUME}/${resumeId}/question/label`);

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<GetQuestionLabelList> = await response.json();

  return data;
};

interface UseQuestionLabelListProps {
  resumeId: number;
  enabled: boolean;
}

export const useQuestionLabelList = ({ resumeId, enabled }: UseQuestionLabelListProps) => {
  return useQuery({
    queryKey: ['questionList', resumeId, 'labelList'],
    queryFn: () => getQuestionLabelList({ resumeId }),
    enabled,
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
