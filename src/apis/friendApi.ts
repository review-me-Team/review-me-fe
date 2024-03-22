import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FRIEND_LIST_SIZE, REQUEST_URL } from '@constants';
import { apiClient } from './apiClient';
import { PageNationData } from './response.types';

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
  start,
}: {
  pageParam: number;
  jwt?: string;
  start?: string;
}) => {
  const queryString = `page=${pageParam}&size=${FRIEND_LIST_SIZE}${start && `&start=${start}`}`;

  const data = apiClient.get<GetFriendList>(`${REQUEST_URL.FRIEND}?${queryString}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return data;
};

interface UseFriendListProps {
  jwt?: string;
  start?: string;
  enabled?: boolean;
}

export const useFriendList = ({ jwt, start = '', enabled = true }: UseFriendListProps) => {
  return useInfiniteQuery({
    queryKey: ['friendList', start],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getFriendList({ pageParam, jwt, start }),
    getNextPageParam: (lastPage) => {
      const { pageNumber, lastPage: lastPageNum } = lastPage;

      return pageNumber < lastPageNum ? pageNumber + 1 : null;
    },
    enabled,
  });
};

// DELETE 친구 삭제
export const deleteFriend = async ({ friendId, jwt }: { friendId: number; jwt: string }) => {
  const data = apiClient.delete<null>(`${REQUEST_URL.FRIEND}/${friendId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

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
  const data = apiClient.post<null>(`${REQUEST_URL.FRIEND}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });

  return data;
};

export const usePostFriendRequest = () => {
  return useMutation({
    mutationFn: postFriendRequest,
  });
};

// GET 내가 보낸 친구 요청 목록 조회
interface GetFollowingList extends PageNationData {
  users: User[];
}
const getFollowingList = async ({
  pageParam,
  start,
  size,
  jwt,
}: {
  pageParam: number;
  start: string;
  size: number;
  jwt?: string;
}) => {
  const queryString = `page=${pageParam}&size=${size}${start && `&start=${start}`}`;
  const data = apiClient.get<GetFollowingList>(`${REQUEST_URL.FRIEND}/following?${queryString}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return data;
};

interface UseFollowingListProps {
  jwt?: string;
  start?: string;
  size?: number;
  enabled?: boolean;
}

export const useFollowingList = ({
  jwt,
  start = '',
  size = FRIEND_LIST_SIZE,
  enabled = true,
}: UseFollowingListProps) => {
  return useInfiniteQuery({
    queryKey: ['followingList', start],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getFollowingList({ pageParam, start, size, jwt }),
    getNextPageParam: (lastPage) => {
      const { pageNumber, lastPage: lastPageNum } = lastPage;

      return pageNumber < lastPageNum ? pageNumber + 1 : null;
    },
    enabled,
  });
};

// GET 나에게 온 친구 요청 목록 조회
interface GetFollowerList extends PageNationData {
  users: User[];
}

const getFollowerList = async ({
  jwt,
  pageParam,
  start,
}: {
  jwt?: string;
  pageParam: number;
  start: string;
}) => {
  const queryString = `page=${pageParam}&size=${FRIEND_LIST_SIZE}${start && `&start=${start}`}`;
  const data = apiClient.get<GetFollowerList>(`${REQUEST_URL.FRIEND}/follower?${queryString}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return data;
};

export const useFollowerList = ({ jwt, start = '' }: { jwt?: string; start?: string }) => {
  return useInfiniteQuery({
    queryKey: ['followerList'],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getFollowerList({ jwt, pageParam, start }),
    getNextPageParam: (lastPage) => {
      const { pageNumber, lastPage: lastPageNum } = lastPage;

      return pageNumber < lastPageNum ? pageNumber + 1 : null;
    },
  });
};

// DELETE 친구 요청 취소
const deleteFriendRequest = async ({ userId, jwt }: { userId: number; jwt: string }) => {
  const data = apiClient.delete<null>(`${REQUEST_URL.FRIEND}/following/${userId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return data;
};

export const useDeleteFriendRequest = () => {
  return useMutation({
    mutationFn: deleteFriendRequest,
  });
};

// PATCH 친구 요청 수락
const acceptFriendRequest = async ({ userId, jwt }: { userId: number; jwt: string }) => {
  const data = apiClient.patch<null>(REQUEST_URL.FRIEND, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });

  return data;
};

export const useAcceptFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['followerList'] }),
        queryClient.invalidateQueries({ queryKey: ['friendList'] }),
      ]);
    },
  });
};

// PATCH 친구 요청 거절
const rejectFriendRequest = async ({ userId, jwt }: { userId: number; jwt: string }) => {
  const data = apiClient.patch<null>(`${REQUEST_URL.FRIEND}/${userId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return data;
};

export const useRejectFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followerList'] });
    },
  });
};
