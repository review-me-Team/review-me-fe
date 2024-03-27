import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginRequestModal from '@components/Modal/LoginRequestModal';
import { useUserContext } from '@contexts/userContext';
import { ROUTE_PATH } from '@constants';

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUserContext();

  if (!isLoggedIn) {
    return (
      <LoginRequestModal
        isOpen={true}
        onClose={() => {
          navigate(ROUTE_PATH.ROOT);
        }}
      />
    );
  }

  return children;
};

export default PrivateRoute;
