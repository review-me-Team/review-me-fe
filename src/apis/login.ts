import { useMutation, useQuery } from '@tanstack/react-query';
import { REQUEST_URL } from '@constants';
import { ApiResponse } from './response.types';

// POST jwt 발급
interface GetJwt {
  jwt: string;
}

const getJwt = async (code: string) => {
  const response = await fetch(`${REQUEST_URL.OAUTH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
    credentials: 'include',
  });

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<GetJwt> = await response.json();

  return data;
};

export const useJwt = () => {
  return useMutation({
    mutationFn: getJwt,
  });
};
