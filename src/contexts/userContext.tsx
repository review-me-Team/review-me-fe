import React, { ReactNode, createContext, useContext, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { usePostLogout } from '@apis/login';
import { parseJwt } from '@utils';

interface User {
  id: number;
  name: string;
  avatarUrl: string;
}

interface JwtPayload {
  userProfile: User;
  exp: number;
}

interface UserContext {
  jwt?: string;
  user: User | null;
  isLoggedIn: boolean;
  login: (jwt: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContext | null>(null);

const useUserContext = () => {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return user;
};

interface UserProviderProps {
  children: ReactNode;
}

// jwt는 상태로 관리, refresh token은 쿠키로 관리
// 로그인하면 페이지 리로드가 발생하여 jwt가 초기화되는 문제가 있음
const UserProvider = ({ children }: UserProviderProps) => {
  const [jwt, setJwt] = useState<string | undefined>(undefined);

  const { mutate: postLogout } = usePostLogout();
  const queryClient = useQueryClient();

  const login = (jwt: string) => {
    setJwt(jwt);
  };

  const logout = () => {
    if (jwt) {
      postLogout(
        { jwt },
        {
          onSuccess: () => {
            setJwt(undefined);
            queryClient.removeQueries({ queryKey: ['jwt'] });
          },
        },
      );
    }
  };

  const parsedJwt: JwtPayload = jwt ? parseJwt(jwt) : null;

  const user = parsedJwt ? parsedJwt.userProfile : null;
  const isLoggedIn = !!jwt;

  return (
    <UserContext.Provider value={{ jwt, user, login, logout, isLoggedIn }}>{children}</UserContext.Provider>
  );
};

export { UserProvider, useUserContext };
