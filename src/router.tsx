import React from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';

import Layout from '@components/Layout';
import TokenRefresh from '@components/TokenRefresh';
import { UserProvider } from '@contexts/userContext';
import MainPage from '@pages/MainPage';
import MyPage from '@pages/MyPage';
import MyResume from '@pages/MyResume';
import Resume from '@pages/Resume';
import ResumeDetail from '@pages/ResumeDetail';
import ResumeUpdate from '@pages/ResumeUpdate';
import ResumeUpload from '@pages/ResumeUpload';
import SocialLogin from '@pages/SocialLogin';
import { ROUTE_PATH } from '@constants';

const router = createBrowserRouter([
  {
    path: ROUTE_PATH.ROOT,
    element: (
      <UserProvider>
        <TokenRefresh>
          <Layout />
        </TokenRefresh>
      </UserProvider>
    ),
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: ROUTE_PATH.MY_PAGE,
        element: <MyPage />,
      },
      {
        path: ROUTE_PATH.RESUME,
        element: <Resume />,
      },
      {
        path: `${ROUTE_PATH.RESUME}/:resumeId`,
        element: <ResumeDetail />,
      },
      {
        path: ROUTE_PATH.MY_RESUME,
        element: <MyResume />,
      },
      {
        path: ROUTE_PATH.RESUME_UPLOAD,
        element: <ResumeUpload />,
      },
      {
        path: ROUTE_PATH.RESUME_UPDATE,
        element: (
          <TokenRefresh>
            <ResumeUpdate />
          </TokenRefresh>
        ),
      },
    ],
  },
  {
    path: ROUTE_PATH.ROOT,
    element: (
      <UserProvider>
        <Outlet />
      </UserProvider>
    ),
    children: [{ path: ROUTE_PATH.SOCIAL_LOGIN, element: <SocialLogin /> }],
  },
]);

export default router;
