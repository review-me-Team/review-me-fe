import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import { ROUTE_PATH } from '@constants';

const SocialLogin = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const { createJwtQuery } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (code)
      createJwtQuery.mutate(code, {
        onError: () => {
          alert('로그인에 실패했습니다.');
        },
        onSettled: () => {
          navigate(ROUTE_PATH.ROOT);
        },
      });
  }, [code]);

  return <></>;
};

export default SocialLogin;
