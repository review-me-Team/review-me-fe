import React, { useEffect } from 'react';
import useAuth from '@hooks/useAuth';
import { useUserContext } from '@contexts/userContext';

interface Props {
  children: React.ReactNode;
}

const TokenRefresh = ({ children }: Props) => {
  const { getRenewedJwtQuery } = useAuth();
  const { isSuccess, refetch, isFetched, data } = getRenewedJwtQuery;
  const { login } = useUserContext();

  useEffect(() => {
    if (!isFetched) {
      refetch();
    }
    if (isSuccess) {
      login(data.jwt);
    }
  }, [isSuccess, isFetched, data]);

  return <>{children}</>;
};

export default TokenRefresh;
