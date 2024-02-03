import { useInfiniteQuery } from '@tanstack/react-query';
import { REQUEST_URL } from '@constants';
import { ApiResponse, PageNationData } from './response.types';

// GET 이력서 목록 조회
export interface Resume {
  id: number;
  title: string;
  writerId: number;
  writerName: string;
  writerProfileUrl: string;
  createdAt: string;
  scope: string;
  occupation: string;
  year: number;
}

type ResumeList = Resume[];

interface GetResumeList extends PageNationData {
  resumes: ResumeList;
}

export const getResumeList = async (pageParam: number) => {
  const response = await fetch(`${REQUEST_URL.RESUME}?page=${pageParam}`);

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<GetResumeList> = await response.json();

  return data;
};

export const useResumeList = () => {
  return useInfiniteQuery({
    queryKey: ['resumeList'],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getResumeList(pageParam),
    getNextPageParam: (lastPage) => {
      const { pageNumber, lastPage: lastPageNum } = lastPage;

      return pageNumber < lastPageNum ? pageNumber + 1 : null;
    },
  });
};
