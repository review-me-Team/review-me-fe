import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '@contexts/userContext';
import { usePostAuthorizationCode } from '@apis/login';

const SocialLogin = () => {
  const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get('code');
  const { mutate, data } = usePostAuthorizationCode();
  const { login } = useUserContext();

  useEffect(() => {
    if (code) {
      mutate(code);
      // todo: 이전 페이지로 이동 (현재는 메인 페이지로 이동하도록 구현)
      navigate('/');
      if (data?.jwt) {
        login(data.jwt);
      }
    }
  }, []);

  return <></>;
};

export default SocialLogin;
