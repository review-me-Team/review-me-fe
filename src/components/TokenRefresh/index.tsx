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
  const { isSuccess, refetch, isFetched, data, isError, status, error } = getRenewedJwtQuery;
  const { login, logout, isLoggedIn, jwt } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const shouldRefreshJwt = isLoggedIn;

    if (!shouldRefreshJwt) return;

    if (!isFetched) {
      refetch();
      return;
    }

    const isJwtRenewalSuccessful = isSuccess && data;
    const isJwtRenewalFailed = isError;

    if (isJwtRenewalSuccessful) {
      login(data.jwt);
    }
    if (isJwtRenewalFailed) {
      logout();
      alert(error?.message);
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
