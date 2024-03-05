import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import { useUserContext } from '@contexts/userContext';
import { ROUTE_PATH } from '@constants';

const SocialLogin = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const { createJwtQuery } = useAuth();
  const { logout } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (code)
      createJwtQuery.mutate(code, {
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
