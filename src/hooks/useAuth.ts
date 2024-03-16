import { usePostRefreshToken, useRenewJwt } from '@apis/login';

const useAuth = () => {
  const createRefreshTokenQuery = usePostRefreshToken();
  const getRenewedJwtQuery = useRenewJwt();

  return { createRefreshTokenQuery, getRenewedJwtQuery };
};

export default useAuth;
