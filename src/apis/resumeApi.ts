import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
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

// POST 이력서 업로드
interface PostResume {
  id: number;
}

export const postResume = async ({
  title,
  pdf,
  scopeId,
  occupationId,
  year,
}: {
  title: string;
  pdf: File;
  scopeId: number;
  occupationId: number;
  year: number;
}) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('pdf', pdf);
  formData.append('scopeId', String(scopeId));
  formData.append('occupationId', String(occupationId));
  formData.append('year', String(year));

  const response = await fetch(REQUEST_URL.RESUME, {
    method: 'POST',
    cache: 'no-cache',
    body: formData,
  });

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<PostResume> = await response.json();

  return data;
};

export const usePostResume = () => {
  return useMutation({ mutationFn: postResume });
};
