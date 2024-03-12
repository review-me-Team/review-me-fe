import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
export interface GetQuestionList extends PageNationData {
  questions: QuestionList;
}

export const getQuestionList = async ({
  resumeId,
  pageParam,
  resumePage,
  jwt,
}: {
  resumeId: number;
  pageParam: number;
  resumePage: number;
  jwt?: string;
}) => {
  const headers = new Headers();
  if (jwt) headers.append('Authorization', `Bearer ${jwt}`);

  const requestOptions: RequestInit = {
    headers,
  };

  const response = await fetch(
    `${REQUEST_URL.RESUME}/${resumeId}/question?page=${pageParam}&resumePage=${resumePage}`,
    requestOptions,
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
  jwt?: string;
}

export const useQuestionList = ({ resumeId, resumePage, enabled, jwt }: UseQuestionListProps) => {
  return useInfiniteQuery({
    queryKey: ['questionList', resumeId, resumePage],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getQuestionList({ resumeId, pageParam, resumePage, jwt }),
    getNextPageParam: (lastPage) => {
      const { pageNumber, lastPage: lastPageNum } = lastPage;

      return pageNumber < lastPageNum ? pageNumber + 1 : null;
    },
    enabled,
  });
};

// GET 예상질문에 달린 댓글 조회
export interface QuestionReply {
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

export interface GetQuestionReplyList extends PageNationData {
  questionComments: QuestionReply[];
}

export const getQuestionReplyList = async ({
  resumeId,
  parentQuestionId,
  pageParam,
  jwt,
}: {
  resumeId: number;
  parentQuestionId: number;
  pageParam: number;
  jwt?: string;
}) => {
  const headers = new Headers();
  if (jwt) headers.append('Authorization', `Bearer ${jwt}`);

  const requestOptions: RequestInit = {
    headers,
  };

  const response = await fetch(
    `${REQUEST_URL.RESUME}/${resumeId}/question/${parentQuestionId}?page=${pageParam}`,
    requestOptions,
  );

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<GetQuestionReplyList> = await response.json();

  return data;
};

interface UseQuestionReplyListProps {
  resumeId: number;
  parentQuestionId: number;
  enabled: boolean;
  jwt?: string;
}

export const useQuestionReplyList = ({
  resumeId,
  parentQuestionId,
  enabled,
  jwt,
}: UseQuestionReplyListProps) => {
  return useInfiniteQuery({
    queryKey: ['questionReplyList', resumeId, parentQuestionId],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getQuestionReplyList({ resumeId, parentQuestionId, pageParam, jwt }),
    getNextPageParam: (lastPage) => {
      const { pageNumber, lastPage: lastPageNum } = lastPage;

      return pageNumber < lastPageNum ? pageNumber + 1 : null;
    },
    enabled,
  });
};

// POST 예상 질문 추가
export const postQuestion = async ({
  resumeId,
  content,
  labelContent,
  resumePage,
  jwt,
}: {
  resumeId: number;
  content: string;
  labelContent: string;
  resumePage: number;
  jwt: string;
}) => {
  const newQuestion: {
    content: string;
    resumePage: number;
    labelContent: string;
  } = {
    content,
    resumePage,
    labelContent,
  };

  const response = await fetch(`${REQUEST_URL.RESUME}/${resumeId}/question`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(newQuestion),
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

// DELETE 예상 질문 삭제
export const deleteQuestion = async ({
  resumeId,
  questionId,
  jwt,
}: {
  resumeId: number;
  questionId: number;
  jwt: string;
}) => {
  const response = await fetch(`${REQUEST_URL.RESUME}/${resumeId}/question/${questionId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<null> = await response.json();

  return data;
};

export const useDeleteQuestion = () => {
  return useMutation({ mutationFn: deleteQuestion });
};

// PATCH 예상 질문 이모지 수정
export const patchEmojiAboutQuestion = async ({
  resumeId,
  questionId,
  emojiId,
  jwt,
}: {
  resumeId: number;
  questionId: number;
  emojiId: number | null;
  jwt: string;
}) => {
  const response = await fetch(`${REQUEST_URL.RESUME}/${resumeId}/question/${questionId}/emoji`, {
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

export const usePatchEmojiAboutQuestion = () => {
  return useMutation({ mutationFn: patchEmojiAboutQuestion });
};

// POST 예상 질문 대댓글 작성
export const postQuestionReply = async ({
  resumeId,
  parentQuestionId,
  content,
  jwt,
}: {
  resumeId: number;
  parentQuestionId: number;
  content: string;
  jwt: string;
}) => {
  const response = await fetch(`${REQUEST_URL.RESUME}/${resumeId}/question/${parentQuestionId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<null> = await response.json();

  return data;
};

interface UsePostQuestionReplyProps {
  resumeId: number;
  parentId: number;
}

export const usePostQuestionReply = ({ resumeId, parentId }: UsePostQuestionReplyProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postQuestionReply,
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['questionList', resumeId],
        }),
        queryClient.invalidateQueries({
          queryKey: ['questionReplyList', resumeId, parentId],
        }),
      ]);
    },
  });
};
