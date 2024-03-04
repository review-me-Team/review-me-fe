import React, { useEffect } from 'react';
import { useUserContext } from '@contexts/userContext';
import { useRenewJwt } from '@apis/login';

interface Props {
  children: React.ReactNode;
}

const TokenRefresh = ({ children }: Props) => {
  const { isSuccess, refetch, isFetched, data } = useRenewJwt();
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
