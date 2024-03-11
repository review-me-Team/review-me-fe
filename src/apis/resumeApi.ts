import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
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

// GET 이력서 상세 조회
interface GetResumeDetail {
  resumeUrl: string;
  title: string;
  writerName: string;
  writerProfileUrl: string;
  occupation: string;
  year: number;
}

export const getResumeDetail = async (resumeId: number) => {
  const response = await fetch(`${REQUEST_URL.RESUME}/${resumeId}`);

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<GetResumeDetail> = await response.json();

  return data;
};

export const useResumeDetail = (resumeId: number) => {
  return useQuery({ queryKey: ['resume', resumeId], queryFn: () => getResumeDetail(resumeId) });
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
  jwt,
}: {
  title: string;
  pdf: File;
  scopeId: number;
  occupationId: number;
  year: number;
  jwt: string;
}) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('pdf', pdf);
  formData.append('scopeId', String(scopeId));
  formData.append('occupationId', String(occupationId));
  formData.append('year', String(year));

  const response = await fetch(REQUEST_URL.RESUME, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${jwt}`,
    },
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

// PATCH 이력서 수정
export const updateResume = async ({
  resumeId,
  title,
  scopeId,
  occupationId,
  year,
}: {
  resumeId: number;
  title: string;
  scopeId: number;
  occupationId: number;
  year: number;
}) => {
  const response = await fetch(`${REQUEST_URL.RESUME}/${resumeId}`, {
    method: 'PATCH',
    body: JSON.stringify({ title, scopeId, occupationId, year }),
  });

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<null> = await response.json();

  return data;
};

export const useUpdateResume = () => {
  return useMutation({ mutationFn: updateResume });
};
