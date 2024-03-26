import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToastContext } from '@contexts/toastContext';
import { useUserContext } from '@contexts/userContext';
import { useRenewJwt } from '@apis/login';
import { API_CUSTOM_ERROR_CODE, ROUTE_PATH } from '@constants';

interface Props {
  children: React.ReactNode;
}

const TokenRefresh = ({ children }: Props) => {
  const { data, status, error, isFetched } = useRenewJwt();
  const { login, logout, isLoggedIn } = useUserContext();
  const { openToast } = useToastContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) return;

    if (status === 'success' && data) {
      login(data.jwt);
    }
    if (status === 'error') {
      if (error.code === 1003 || error.code === 1004) {
        openToast({ type: 'error', message: API_CUSTOM_ERROR_CODE[error.code] });
        logout();
        navigate(ROUTE_PATH.ROOT);
      }
    }
  }, [isFetched, isLoggedIn, data, status, error]);

  if (status === 'pending') return <></>;

  return <>{children}</>;
};

export default TokenRefresh;
