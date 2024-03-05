import React, { useEffect } from 'react';
import useAuth from '@hooks/useAuth';
import { useUserContext } from '@contexts/userContext';

interface Props {
  children: React.ReactNode;
}

const TokenRefresh = ({ children }: Props) => {
  const { getRenewedJwtQuery } = useAuth();
  const { isSuccess, refetch, isFetched, data, isError } = getRenewedJwtQuery;
  const { login, logout, isLoggedIn } = useUserContext();

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
    }
  }, [isSuccess, isFetched, data, isLoggedIn]);

  return <>{children}</>;
};

export default TokenRefresh;
