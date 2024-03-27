import React, { Suspense } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';

import styled from 'styled-components';
import DelayedComponent from '@components/DelayedComponent';
import Layout from '@components/Layout';
import Spinner from '@components/Spinner';
import TokenRefresh from '@components/TokenRefresh';
import { UserProvider } from '@contexts/userContext';
import { ROUTE_PATH } from '@constants';

const MainPage = React.lazy(() => import(/* webpackChunkName: "mainPage" */ '@pages/MainPage'));
const MyPage = React.lazy(() => import(/* webpackChunkName: "myPage" */ '@pages/MyPage'));
const MyResume = React.lazy(() => import(/* webpackChunkName: "myResume" */ '@pages/MyResume'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "notFound" */ '@pages/NotFound'));
const Resume = React.lazy(() => import(/* webpackChunkName: "resume" */ '@pages/Resume'));
const ResumeDetail = React.lazy(() => import(/* webpackChunkName: "resumeDetail" */ '@pages/ResumeDetail'));
const ResumeUpdate = React.lazy(() => import(/* webpackChunkName: "resumeUpdate" */ '@pages/ResumeUpdate'));
const ResumeUpload = React.lazy(() => import(/* webpackChunkName: "resumeUpload" */ '@pages/ResumeUpload'));
const SocialLogin = React.lazy(() => import(/* webpackChunkName: "socialLogin" */ '@pages/SocialLogin'));

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const router = createBrowserRouter([
  {
    path: ROUTE_PATH.ROOT,
    errorElement: <NotFound />,
    element: (
      <UserProvider>
        <TokenRefresh>
          <Suspense
            fallback={
              <DelayedComponent>
                <SpinnerWrapper>
                  <Spinner size="6.25rem" />
                </SpinnerWrapper>
              </DelayedComponent>
            }
          >
            <Layout />
          </Suspense>
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
        path: `${ROUTE_PATH.RESUME_UPDATE}/:resumeId`,
        element: <ResumeUpdate />,
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
