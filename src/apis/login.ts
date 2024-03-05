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

// GET refresh token을 통해 jwt 재발급
interface GetRenewedJwt {
  jwt: string;
}

const getRenewedJwt = async () => {
  const response = await fetch(`${REQUEST_URL.RENEW_JWT}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<GetRenewedJwt> = await response.json();

  return data;
};

export const useRenewJwt = () => {
  // jwt 갱신 주기: 10분
  const JWT_REFRESH_INTERVAL = 10 * 60 * 1000;
  const JWT_EXPIRED_TIME = 60 * 60 * 1000;

  return useQuery({
    queryKey: ['jwt'],
    queryFn: getRenewedJwt,
    staleTime: JWT_EXPIRED_TIME,
    refetchInterval: JWT_REFRESH_INTERVAL,
    retry: false,
  });
};
