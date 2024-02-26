import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useUserContext } from '@contexts/userContext';
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
    credentials: 'include',
  });

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<PostAuthorizationCode> = await response.json();

  return data;
};

export const usePostAuthorizationCode = () => {
  const navigate = useNavigate();
  const { login } = useUserContext();

  return useMutation({
    mutationFn: postAuthorizationCode,
    onSuccess: ({ jwt }) => {
      login(jwt);
      navigate('/');
    },
  });
};
