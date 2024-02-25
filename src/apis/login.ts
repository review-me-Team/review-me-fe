import { useMutation } from '@tanstack/react-query';
import { REQUEST_URL } from '@constants';
import { ApiResponse } from './response.types';

interface PostAuthorizationCode {
  jwt: string;
}

const postAuthorizationCode = async (code: string) => {
  const response = await fetch(REQUEST_URL.OAUTH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<PostAuthorizationCode> = await response.json();

  return data;
};

export const usePostAuthorizationCode = () => {
  return useMutation({
    mutationFn: postAuthorizationCode,
  });
};
