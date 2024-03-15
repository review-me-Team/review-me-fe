import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import { useUserContext } from '@contexts/userContext';
import { IS_LOGGED_IN_KEY, ROUTE_PATH } from '@constants';

const SocialLogin = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const { createRefreshTokenQuery } = useAuth();
  const { logout } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (code)
      createRefreshTokenQuery.mutate(code, {
        onSuccess: () => {
          localStorage.setItem(IS_LOGGED_IN_KEY, 'true');
        },
        onError: () => {
          alert('로그인에 실패했습니다.');
          logout();
        },
        onSettled: () => {
          navigate(ROUTE_PATH.ROOT);
        },
      });
  }, [code]);

  return <></>;
};

export default SocialLogin;
