import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { REPLY_LIST_SIZE, REQUEST_URL } from '@constants';
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

export interface GetFeedbackList extends PageNationData {
  feedbacks: FeedbackList;
}

export const getFeedbackList = async ({
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
    `${REQUEST_URL.RESUME}/${resumeId}/feedback?page=${pageParam}&resumePage=${resumePage}`,
    requestOptions,
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
  jwt?: string;
}

export const useFeedbackList = ({ resumeId, resumePage, enabled, jwt }: UseFeedbackListProps) => {
  return useInfiniteQuery({
    queryKey: ['feedbackList', resumeId, resumePage],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getFeedbackList({ resumeId, pageParam, resumePage, jwt }),
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

export interface GetFeedbackReplyList extends PageNationData {
  feedbackComments: FeedbackReply[];
}

export const getFeedbackReplyList = async ({
  resumeId,
  parentFeedbackId,
  pageParam,
  jwt,
}: {
  resumeId: number;
  parentFeedbackId: number;
  pageParam: number;
  jwt?: string;
}) => {
  const headers = new Headers();
  if (jwt) headers.append('Authorization', `Bearer ${jwt}`);

  const requestOptions: RequestInit = {
    headers,
  };

  const response = await fetch(
    `${REQUEST_URL.RESUME}/${resumeId}/feedback/${parentFeedbackId}?page=${pageParam}&size=${REPLY_LIST_SIZE}`,
    requestOptions,
  );

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<GetFeedbackReplyList> = await response.json();

  return data;
};

interface UseFeedbackReplyListProps {
  resumeId: number;
  parentFeedbackId: number;
  jwt?: string;
}

export const useFeedbackReplyList = ({ resumeId, parentFeedbackId, jwt }: UseFeedbackReplyListProps) => {
  return useInfiniteQuery({
    queryKey: ['feedbackReplyList', resumeId, parentFeedbackId],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getFeedbackReplyList({ resumeId, parentFeedbackId, pageParam, jwt }),
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

// DELETE 피드백 삭제
export const deleteFeedback = async ({
  resumeId,
  feedbackId,
  jwt,
}: {
  resumeId: number;
  feedbackId: number;
  jwt: string;
}) => {
  const response = await fetch(`${REQUEST_URL.RESUME}/${resumeId}/feedback/${feedbackId}`, {
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

export const useDeleteFeedback = () => {
  return useMutation({ mutationFn: deleteFeedback });
};

// PATCH 피드백 수정
export const patchFeedback = async ({
  resumeId,
  feedbackId,
  labelId,
  content,
  jwt,
}: {
  resumeId: number;
  feedbackId: number;
  labelId?: number;
  content: string;
  jwt: string;
}) => {
  const requestBody: { labelId?: number; content: string } = {
    content,
  };
  if (labelId) requestBody.labelId = labelId;

  const response = await fetch(`${REQUEST_URL.RESUME}/${resumeId}/feedback/${feedbackId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<null> = await response.json();

  return data;
};

export const usePatchFeedback = () => {
  return useMutation({ mutationFn: patchFeedback });
};

// PATCH 피드백 체크 상태 수정
export const patchFeedbackCheck = async ({
  resumeId,
  feedbackId,
  checked,
  jwt,
}: {
  resumeId: number;
  feedbackId: number;
  checked: boolean;
  jwt: string;
}) => {
  const response = await fetch(`${REQUEST_URL.RESUME}/${resumeId}/feedback/${feedbackId}/check`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ checked }),
  });

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<null> = await response.json();

  return data;
};

interface UsePatchFeedbackCheckProps {
  resumePage: number;
}

export const usePatchFeedbackCheck = ({ resumePage }: UsePatchFeedbackCheckProps) => {
  const queryClient = useQueryClient();

  // * optimistic update
  return useMutation({
    mutationFn: patchFeedbackCheck,
    onMutate: async (newData) => {
      const { resumeId, feedbackId } = newData;
      await queryClient.cancelQueries({ queryKey: ['feedbackList', resumeId, resumePage] });

      const previousFeedbackListData = queryClient.getQueryData<InfiniteData<GetFeedbackList>>([
        'feedbackList',
        resumeId,
        resumePage,
      ]);

      queryClient.setQueryData<InfiniteData<GetFeedbackList>>(
        ['feedbackList', resumeId, resumePage],
        (oldData) => {
          if (!oldData) return previousFeedbackListData;

          const newPages = oldData.pages.map((page) => ({
            ...page,
            feedbacks: page.feedbacks.map((feedback) => {
              if (feedback.id === feedbackId) return { ...feedback, checked: newData.checked };

              return { ...feedback };
            }),
          }));

          return { ...oldData, pages: newPages };
        },
      );

      return { previousFeedbackListData };
    },
    onError: (err, newData, context) => {
      if (!context) return;

      queryClient.setQueryData(
        ['feedbackList', newData.resumeId, resumePage],
        context.previousFeedbackListData,
      );
    },
    onSettled: (_, _error, newData) => {
      queryClient.invalidateQueries({ queryKey: ['feedbackList', newData.resumeId, resumePage] });
    },
  });
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
  emojiId: number | null;
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

// POST 피드백 대댓글 작성
export const postFeedbackReply = async ({
  resumeId,
  parentFeedbackId,
  content,
  jwt,
}: {
  resumeId: number;
  parentFeedbackId: number;
  content: string;
  jwt: string;
}) => {
  const response = await fetch(`${REQUEST_URL.RESUME}/${resumeId}/feedback/${parentFeedbackId}`, {
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

interface UsePostFeedbackReplyProps {
  resumeId: number;
  parentId: number;
}

export const usePostFeedbackReply = ({ resumeId, parentId }: UsePostFeedbackReplyProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postFeedbackReply,
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['feedbackList', resumeId],
        }),
        queryClient.invalidateQueries({
          queryKey: ['feedbackReplyList', resumeId, parentId],
        }),
      ]);
    },
  });
};
