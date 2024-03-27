import { useMutation, useQuery } from '@tanstack/react-query';
import { REQUEST_URL } from '@constants';
import { apiClient } from './apiClient';
import { ApiErrorResponse } from './response.types';

// POST code를 통해 refresh token만 생성
type CreateRefreshTokenRequest = string;

const createRefreshToken = async (code: CreateRefreshTokenRequest) => {
  const data = apiClient.post<null>(`${REQUEST_URL.OAUTH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
    credentials: 'include',
  });

  return data;
};

export const usePostRefreshToken = () => {
  return useMutation<null, ApiErrorResponse, CreateRefreshTokenRequest>({
    mutationFn: createRefreshToken,
    retry: false,
  });
};

// GET refresh token을 통해 jwt 재발급
interface GetRenewedJwt {
  jwt: string;
}

const getRenewedJwt = async () => {
  const data = apiClient.get<GetRenewedJwt>(REQUEST_URL.RENEW_JWT, { credentials: 'include' });

  return data;
};

export const useRenewJwt = () => {
  // jwt 갱신 주기: 10분
  const JWT_REFRESH_INTERVAL = 10 * 60 * 1000;
  const JWT_EXPIRED_TIME = 60 * 60 * 1000;

  return useQuery<GetRenewedJwt, ApiErrorResponse>({
    queryKey: ['jwt'],
    queryFn: getRenewedJwt,
    staleTime: JWT_EXPIRED_TIME,
    refetchInterval: JWT_REFRESH_INTERVAL,
    retry: false,
  });
};

// POST 로그아웃
interface PostLogoutRequest {
  jwt: string;
}

const postLogout = async ({ jwt }: PostLogoutRequest) => {
  const data = apiClient.post<null>(REQUEST_URL.LOGOUT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    credentials: 'include',
  });

  return data;
};

export const usePostLogout = () => {
  return useMutation<null, ApiErrorResponse, PostLogoutRequest>({
    mutationFn: postLogout,
  });
};
