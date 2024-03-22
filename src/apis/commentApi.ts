import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { REQUEST_URL } from '@constants';
import { apiClient } from './apiClient';
import { PageNationData } from './response.types';

interface Emoji {
  id: number;
  count: number;
}

export interface Comment {
  id: number;
  content: string;
  commenterId: number;
  commenterName: string;
  commenterProfileUrl: string;
  createdAt: string;
  emojis: Emoji[];
  myEmojiId: number | null;
}

type CommentList = Comment[];

export interface GetCommentList extends PageNationData {
  comments: CommentList;
}

export const getCommentList = async ({
  resumeId,
  pageParam,
  jwt,
}: {
  resumeId: number;
  pageParam: number;
  jwt?: string;
}) => {
  const headers = new Headers();
  if (jwt) headers.append('Authorization', `Bearer ${jwt}`);

  const requestOptions: RequestInit = {
    headers,
  };

  const data = apiClient.get<GetCommentList>(
    `${REQUEST_URL.RESUME}/${resumeId}/comment?page=${pageParam}`,
    requestOptions,
  );

  return data;
};

interface UseCommentListProps {
  resumeId: number;
  enabled: boolean;
  jwt?: string;
}

export const useCommentList = ({ resumeId, enabled, jwt }: UseCommentListProps) => {
  return useInfiniteQuery({
    queryKey: ['commentList', resumeId],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getCommentList({ resumeId, pageParam, jwt }),
    getNextPageParam: (lastPage) => {
      const { pageNumber, lastPage: lastPageNum } = lastPage;

      return pageNumber < lastPageNum ? pageNumber + 1 : null;
    },
    enabled,
  });
};

// POST 댓글 추가
export const postComment = async ({
  resumeId,
  content,
  jwt,
}: {
  resumeId: number;
  content: string;
  jwt: string;
}) => {
  const newComment: { content: string } = { content };

  const data = await apiClient.post<null>(`${REQUEST_URL.RESUME}/${resumeId}/comment`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(newComment),
  });

  return data;
};

export const usePostComment = () => {
  return useMutation({ mutationFn: postComment });
};

// DELETE 댓글 삭제
export const deleteComment = async ({
  resumeId,
  commentId,
  jwt,
}: {
  resumeId: number;
  commentId: number;
  jwt: string;
}) => {
  const data = await apiClient.delete<null>(`${REQUEST_URL.RESUME}/${resumeId}/comment/${commentId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return data;
};

export const useDeleteComment = () => {
  return useMutation({ mutationFn: deleteComment });
};

// PATCH 댓글 수정
export const patchComment = async ({
  resumeId,
  commentId,
  content,
  jwt,
}: {
  resumeId: number;
  commentId: number;
  content: string;
  jwt: string;
}) => {
  const data = await apiClient.patch<null>(`${REQUEST_URL.RESUME}/${resumeId}/comment/${commentId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ content }),
  });

  return data;
};

export const usePatchComment = () => {
  return useMutation({ mutationFn: patchComment });
};

// PATCH 댓글 이모지 수정
export const patchEmojiAboutComment = async ({
  resumeId,
  commentId,
  emojiId,
  jwt,
}: {
  resumeId: number;
  commentId: number;
  emojiId: number | null;
  jwt: string;
}) => {
  const data = apiClient.patch<null>(`${REQUEST_URL.RESUME}/${resumeId}/comment/${commentId}/emoji`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ id: emojiId }),
  });

  return data;
};

export const usePatchEmojiAboutComment = () => {
  return useMutation({ mutationFn: patchEmojiAboutComment });
};
