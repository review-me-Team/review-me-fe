import React, { ReactNode, createContext, useContext, useState } from 'react';
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
  const [jwt, setJwt] = useState<string>();

  const login = (jwt: string) => {
    setJwt(jwt);
  };

  const logout = () => {
    setJwt(undefined);
  };

  const parsedJwt: JwtPayload = jwt ? parseJwt(jwt) : null;

  const user = parsedJwt ? parsedJwt.userProfile : null;

  return <UserContext.Provider value={{ jwt, user, login, logout }}>{children}</UserContext.Provider>;
};

export { UserProvider, useUserContext };
