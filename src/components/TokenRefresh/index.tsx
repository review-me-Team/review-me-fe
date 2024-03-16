import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import { useUserContext } from '@contexts/userContext';
import { ROUTE_PATH } from '@constants';

interface Props {
  children: React.ReactNode;
}

const TokenRefresh = ({ children }: Props) => {
  const { getRenewedJwtQuery } = useAuth();
  const { refetch, data, isError, isSuccess, isFetched } = getRenewedJwtQuery;
  const { login, logout, isLoggedIn, jwt } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const shouldRefreshJwt = isLoggedIn;

    if (!shouldRefreshJwt) return;

    if (!isFetched) {
      refetch();
      return;
    }

    if (isSuccess && data) {
      login(data.jwt);
    }
    if (isError) {
      logout();
      alert('다시 로그인해주세요!');
      navigate(ROUTE_PATH.ROOT);
    }
  }, [isSuccess, isError, isFetched, data, isLoggedIn]);

  const isRenewedJwtNotReceived = isLoggedIn && !jwt;

  if (isRenewedJwtNotReceived) {
    return <></>;
  }

  return <>{children}</>;
};

export default TokenRefresh;
