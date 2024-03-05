import { useJwt, useRenewJwt } from '@apis/login';

const useAuth = () => {
  const createJwtQuery = useJwt();
  const getRenewedJwtQuery = useRenewJwt();

  return { createJwtQuery, getRenewedJwtQuery };
};

export default useAuth;
