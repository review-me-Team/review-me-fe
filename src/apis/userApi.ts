import { useInfiniteQuery } from '@tanstack/react-query';
import { FRIEND_LIST_SIZE, REQUEST_URL } from '@constants';
import { apiClient } from './apiClient';
import { PageNationData } from './response.types';

interface User {
  id: number;
  name: string;
  profileUrl: string;
}

interface GetUserList extends PageNationData {
  users: User[];
}

// todo: jwt 필수값으로 설정하는 법 찾아보기
export const getUserList = async ({
  pageParam,
  jwt,
  start,
}: {
  pageParam: number;
  start: string;
  jwt?: string;
}) => {
  const queryString = `page=${pageParam}&size=${FRIEND_LIST_SIZE}${start && `&start=${start}`}`;

  const data = apiClient.get<GetUserList>(`${REQUEST_URL.USER}?${queryString}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return data;
};

interface UseUserListProps {
  jwt?: string;
  start: string;
}

export const useUserList = ({ jwt, start }: UseUserListProps) => {
  return useInfiniteQuery({
    queryKey: ['userList', start],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getUserList({ pageParam, jwt, start }),
    getNextPageParam: (lastPage) => {
      const { pageNumber, lastPage: lastPageNum } = lastPage;

      return pageNumber < lastPageNum ? pageNumber + 1 : null;
    },
    enabled: false,
  });
};
