import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useJwt } from '@apis/login';
import { ROUTE_PATH } from '@constants';

const SocialLogin = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const { mutate } = useJwt();
  const navigate = useNavigate();

  useEffect(() => {
    if (code)
      mutate(code, {
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
