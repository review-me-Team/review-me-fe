import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { REPLY_LIST_SIZE, REQUEST_URL } from '@constants';
import { apiClient } from './apiClient';
import { PageNationData } from './response.types';

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

  const data = apiClient.get<GetQuestionList>(
    `${REQUEST_URL.RESUME}/${resumeId}/question?page=${pageParam}&resumePage=${resumePage}`,
    requestOptions,
  );

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

  const data = apiClient.get<GetQuestionReplyList>(
    `${REQUEST_URL.RESUME}/${resumeId}/question/${parentQuestionId}?page=${pageParam}&size=${REPLY_LIST_SIZE}`,
    requestOptions,
  );

  return data;
};

interface UseQuestionReplyListProps {
  resumeId: number;
  parentQuestionId: number;
  jwt?: string;
}

export const useQuestionReplyList = ({ resumeId, parentQuestionId, jwt }: UseQuestionReplyListProps) => {
  return useInfiniteQuery({
    queryKey: ['questionReplyList', resumeId, parentQuestionId],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getQuestionReplyList({ resumeId, parentQuestionId, pageParam, jwt }),
    getNextPageParam: (lastPage) => {
      const { pageNumber, lastPage: lastPageNum } = lastPage;

      return pageNumber < lastPageNum ? pageNumber + 1 : null;
    },
    select: (data) => {
      return {
        pages: [...data.pages].reverse(),
        pageParams: [...data.pageParams].reverse(),
      };
    },
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
  labelContent: string | null;
  resumePage: number;
  jwt: string;
}) => {
  const newQuestion: {
    content: string;
    resumePage: number;
    labelContent: string | null;
  } = {
    content,
    resumePage,
    labelContent,
  };

  const data = apiClient.post<null>(`${REQUEST_URL.RESUME}/${resumeId}/question`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(newQuestion),
  });

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
  const data = apiClient.delete<null>(`${REQUEST_URL.RESUME}/${resumeId}/question/${questionId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return data;
};

export const useDeleteQuestion = () => {
  return useMutation({ mutationFn: deleteQuestion });
};

// PATCH 예상질문 수정
export const patchQuestion = async ({
  resumeId,
  questionId,
  labelContent,
  content,
  jwt,
}: {
  resumeId: number;
  questionId: number;
  labelContent?: string | null;
  content: string;
  jwt: string;
}) => {
  const requestBody: { labelContent?: string; content?: string } = {};
  if (labelContent) requestBody.labelContent = labelContent;
  if (content) requestBody.content = content;

  const data = apiClient.patch<null>(`${REQUEST_URL.RESUME}/${resumeId}/question/${questionId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(requestBody),
  });

  return data;
};

export const usePatchQuestion = () => {
  return useMutation({ mutationFn: patchQuestion });
};

// PATCH 예상질문 체크 상태 수정
export const patchQuestionCheck = async ({
  resumeId,
  questionId,
  checked,
  jwt,
}: {
  resumeId: number;
  questionId: number;
  checked: boolean;
  jwt: string;
}) => {
  const data = apiClient.patch<null>(`${REQUEST_URL.RESUME}/${resumeId}/question/${questionId}/check`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ checked }),
  });

  return data;
};

interface UsePatchQuestionCheckProps {
  resumePage: number;
}

export const usePatchQuestionCheck = ({ resumePage }: UsePatchQuestionCheckProps) => {
  const queryClient = useQueryClient();

  // * optimistic update
  return useMutation({
    mutationFn: patchQuestionCheck,
    onMutate: async (newData) => {
      const { resumeId, questionId } = newData;
      await queryClient.cancelQueries({ queryKey: ['questionList', resumeId, resumePage] });

      const previousQuestionListData = queryClient.getQueryData<InfiniteData<GetQuestionList>>([
        'feedbackList',
        resumeId,
        resumePage,
      ]);

      queryClient.setQueryData<InfiniteData<GetQuestionList>>(
        ['questionList', resumeId, resumePage],
        (oldData) => {
          if (!oldData) return previousQuestionListData;

          const newPages = oldData.pages.map((page) => ({
            ...page,
            questions: page.questions.map((question) => {
              if (question.id === questionId) return { ...question, checked: newData.checked };

              return { ...question };
            }),
          }));

          return { ...oldData, pages: newPages };
        },
      );

      return { previousQuestionListData: previousQuestionListData };
    },
    onError: (err, newData, context) => {
      if (!context) return;

      queryClient.setQueryData(
        ['questionList', newData.resumeId, resumePage],
        context.previousQuestionListData,
      );
    },
    onSettled: (_, _error, newData) => {
      queryClient.invalidateQueries({ queryKey: ['questionList', newData.resumeId, resumePage] });
    },
  });
};

// PATCH 예상질문 북마크 상태 수정
export const patchBookMark = async ({
  resumeId,
  questionId,
  bookmarked,
  jwt,
}: {
  resumeId: number;
  questionId: number;
  bookmarked: boolean;
  jwt: string;
}) => {
  const data = apiClient.patch<null>(`${REQUEST_URL.RESUME}/${resumeId}/question/${questionId}/bookmark`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ bookmarked }),
  });

  return data;
};

interface UsePatchBookMarkProps {
  resumePage: number;
}

export const usePatchBookMark = ({ resumePage }: UsePatchBookMarkProps) => {
  const queryClient = useQueryClient();

  // * optimistic update
  return useMutation({
    mutationFn: patchBookMark,
    onMutate: async (newData) => {
      const { resumeId, questionId } = newData;
      await queryClient.cancelQueries({ queryKey: ['questionList', resumeId, resumePage] });

      const previousQuestionListData = queryClient.getQueryData<InfiniteData<GetQuestionList>>([
        'feedbackList',
        resumeId,
        resumePage,
      ]);

      queryClient.setQueryData<InfiniteData<GetQuestionList>>(
        ['questionList', resumeId, resumePage],
        (oldData) => {
          if (!oldData) return previousQuestionListData;

          const newPages = oldData.pages.map((page) => ({
            ...page,
            questions: page.questions.map((question) => {
              if (question.id === questionId) return { ...question, bookmarked: newData.bookmarked };

              return { ...question };
            }),
          }));

          return { ...oldData, pages: newPages };
        },
      );

      return { previousQuestionListData: previousQuestionListData };
    },
    onError: (err, newData, context) => {
      if (!context) return;

      queryClient.setQueryData(
        ['questionList', newData.resumeId, resumePage],
        context.previousQuestionListData,
      );
    },
    onSettled: (_, _error, newData) => {
      queryClient.invalidateQueries({ queryKey: ['questionList', newData.resumeId, resumePage] });
    },
  });
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
  const data = apiClient.patch<null>(`${REQUEST_URL.RESUME}/${resumeId}/question/${questionId}/emoji`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ id: emojiId }),
  });

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
  const data = apiClient.post<null>(`${REQUEST_URL.RESUME}/${resumeId}/question/${parentQuestionId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ content }),
  });

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
