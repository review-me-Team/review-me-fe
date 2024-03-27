import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToastContext } from '@contexts/toastContext';
import { useUserContext } from '@contexts/userContext';
import { usePostRefreshToken } from '@apis/login';
import { API_CUSTOM_ERROR_CODE, ROUTE_PATH } from '@constants';

const SocialLogin = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const { mutate: createRefreshToken, status } = usePostRefreshToken();
  const { logout } = useUserContext();
  const { openToast } = useToastContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (code && status === 'idle')
      createRefreshToken(code, {
        onError: (error) => {
          if (error.code === 1001) {
            openToast({ type: 'error', message: API_CUSTOM_ERROR_CODE[error.code] });
          }
          logout();
        },
        onSettled: () => {
          navigate(ROUTE_PATH.ROOT);
        },
      });
  }, [code, status]);

  return <></>;
};

export default SocialLogin;
