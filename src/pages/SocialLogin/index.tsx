import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUserContext } from '@contexts/userContext';
import { useJwt } from '@apis/login';
import { ROUTE_PATH } from '@constants';

const SocialLogin = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const { refetch, data, isError, isSuccess, isFetched } = useJwt(code);

  const navigate = useNavigate();
  const { login } = useUserContext();

  useEffect(() => {
    if (!isFetched) refetch();

    if (isSuccess) {
      login(data.jwt);
      navigate(ROUTE_PATH.ROOT);
    }
    if (isError) {
      alert('로그인에 실패했습니다.');
      navigate(ROUTE_PATH.ROOT);
    }
  }, [code, isSuccess, isError, isFetched]);

  return <></>;
};

export default SocialLogin;
