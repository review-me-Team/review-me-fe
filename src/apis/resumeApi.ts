import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

export const getResumeList = async ({
  pageParam,
  jwt,
  occupationId,
  startYear,
  endYear,
}: {
  pageParam: number;
  jwt?: string;
  occupationId?: number;
  startYear: number;
  endYear: number;
}) => {
  const headers = new Headers();
  if (jwt) headers.append('Authorization', `Bearer ${jwt}`);

  const requestOptions: RequestInit = {
    headers,
  };

  let queryString = `page=${pageParam}`;
  if (occupationId) queryString += `&occupationId=${occupationId}`;
  queryString += `&startYear=${startYear}`;
  if (endYear < 10) queryString += `&endYear=${endYear}`;

  const response = await fetch(`${REQUEST_URL.RESUME}?${queryString}`, requestOptions);

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<GetResumeList> = await response.json();

  return data;
};

interface UseResumeListProps {
  jwt?: string;
  occupationId?: number;
  startYear: number;
  endYear: number;
}

export const useResumeList = ({ jwt, occupationId, startYear, endYear }: UseResumeListProps) => {
  const yearFilter = { startYear, endYear };

  return useInfiniteQuery({
    queryKey: ['resumeList', occupationId, yearFilter],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getResumeList({ pageParam, jwt, occupationId, startYear, endYear }),
    getNextPageParam: (lastPage) => {
      const { pageNumber, lastPage: lastPageNum } = lastPage;

      return pageNumber < lastPageNum ? pageNumber + 1 : null;
    },
  });
};

// GET 내 이력서 목록 조회
export interface MyResume {
  id: number;
  title: string;
  createdAt: string;
  scope: string;
  occupation: string;
  year: number;
}

interface GetMyResumeList extends PageNationData {
  resumes: MyResume[];
}

// ! jwt가 없을 경우 401 에러 발생 (custom hook을 최상단에서 호출해야 하기 때문에 undefined도 허용)
export const getMyResumeList = async ({ pageParam, jwt }: { pageParam: number; jwt?: string }) => {
  const response = await fetch(`${REQUEST_URL.MY_RESUME}?page=${pageParam}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<GetMyResumeList> = await response.json();

  return data;
};

interface UseMyResumeListProps {
  jwt?: string;
}

export const useMyResumeList = ({ jwt }: UseMyResumeListProps) => {
  return useInfiniteQuery({
    queryKey: ['myResumeList'],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getMyResumeList({ pageParam, jwt }),
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
  writerId: number;
  writerName: string;
  writerProfileUrl: string;
  occupation: string;
  year: number;
}

export const getResumeDetail = async ({ resumeId, jwt }: { resumeId: number; jwt?: string }) => {
  const headers = new Headers();
  if (jwt) headers.append('Authorization', `Bearer ${jwt}`);

  const requestOptions: RequestInit = {
    headers,
  };

  const response = await fetch(`${REQUEST_URL.RESUME}/${resumeId}`, requestOptions);

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<GetResumeDetail> = await response.json();

  return data;
};

export const useResumeDetail = ({ resumeId, jwt }: { resumeId: number; jwt?: string }) => {
  return useQuery({ queryKey: ['resume', resumeId], queryFn: () => getResumeDetail({ resumeId, jwt }) });
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

// DELETE 이력서 삭제
export const deleteResume = async ({ resumeId, jwt }: { resumeId: number; jwt: string }) => {
  const response = await fetch(`${REQUEST_URL.RESUME}/${resumeId}`, {
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

export const useDeleteResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myResumeList'] });
    },
  });
};

// PATCH 이력서 수정
export const updateResume = async ({
  resumeId,
  title,
  scopeId,
  occupationId,
  year,
  jwt,
}: {
  resumeId: number;
  title: string;
  scopeId: number;
  occupationId: number;
  year: number;
  jwt: string;
}) => {
  const response = await fetch(`${REQUEST_URL.RESUME}/${resumeId}`, {
    method: 'PATCH',
    body: JSON.stringify({ title, scopeId, occupationId, year }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
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
