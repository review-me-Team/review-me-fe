import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { REQUEST_URL } from '@constants';
import { ApiResponse, PageNationData } from './response.types';

// GET 친구 목록 조회
export interface User {
  id: number;
  name: string;
  profileUrl: string;
}

interface GetFriendList extends PageNationData {
  users: User[];
}

// todo: jwt 타입을 string으로만 설정하는 법 찾아보기
export const getFriendList = async ({
  pageParam,
  jwt,
  size,
  start,
}: {
  pageParam: number;
  jwt?: string;
  size: number;
  start?: string;
}) => {
  const queryString = `page=${pageParam}&size=${size || 10}${start && `&start=${start}`}`;
  const response = await fetch(`${REQUEST_URL.FRIEND}?${queryString}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<GetFriendList> = await response.json();

  return data;
};

interface UseFriendListProps {
  jwt?: string;
  size?: number;
  start?: string;
  enabled?: boolean;
}

export const useFriendList = ({ jwt, size = 7, start = '', enabled = true }: UseFriendListProps) => {
  return useInfiniteQuery({
    queryKey: ['friendList', start],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getFriendList({ pageParam, jwt, size, start }),
    getNextPageParam: (lastPage) => {
      const { pageNumber, lastPage: lastPageNum } = lastPage;

      return pageNumber < lastPageNum ? pageNumber + 1 : null;
    },
    enabled,
  });
};

// DELETE 친구 삭제
export const deleteFriend = async ({ friendId, jwt }: { friendId: number; jwt: string }) => {
  const response = await fetch(`${REQUEST_URL.FRIEND}/${friendId}`, {
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

export const useDeleteFriend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friendList'] });
    },
  });
};

// POST 친구 요청
const postFriendRequest = async ({ userId, jwt }: { userId: number; jwt: string }) => {
  const response = await fetch(`${REQUEST_URL.FRIEND}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<null> = await response.json();

  return data;
};

export const usePostFriendRequest = () => {
  return useMutation({
    mutationFn: postFriendRequest,
  });
};

// DELETE 친구 요청 취소
const deleteFriendRequest = async ({ userId, jwt }: { userId: number; jwt: string }) => {
  const response = await fetch(`${REQUEST_URL.FRIEND}/following/${userId}`, {
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

export const useDeleteFriendRequest = () => {
  return useMutation({
    mutationFn: deleteFriendRequest,
  });
};
