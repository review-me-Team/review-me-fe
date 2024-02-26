import React, { useEffect } from 'react';
import { usePostAuthorizationCode } from '@apis/login';

const SocialLogin = () => {
  const code = new URLSearchParams(window.location.search).get('code');
  const { mutate } = usePostAuthorizationCode();

  useEffect(() => {
    if (code) {
      mutate(code);
    }
  }, []);

  return <></>;
};

export default SocialLogin;
