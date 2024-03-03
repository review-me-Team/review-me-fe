import { useQuery } from '@tanstack/react-query';
import { REQUEST_URL } from '@constants';
import { ApiResponse } from './response.types';

interface GetJwt {
  jwt: string;
}

const getJwt = async (code: string | null) => {
  const response = await fetch(`${REQUEST_URL.OAUTH}?code=${code}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<GetJwt> = await response.json();

  return data;
};

export const useJwt = (code: string | null) => {
  return useQuery({
    queryKey: ['jwt'],
    queryFn: () => getJwt(code),
    enabled: !!code,
  });
};
