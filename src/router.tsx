import { lazy, Suspense } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';

import styled from 'styled-components';
import DelayedComponent from '@components/DelayedComponent';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import Layout from '@components/Layout';
import Spinner from '@components/Spinner';
import TokenRefresh from '@components/TokenRefresh';
import ErrorPage from '@pages/ErrorPage';
import { ROUTE_PATH } from '@constants';

const MainPage = lazy(() => import(/* webpackChunkName: "mainPage" */ '@pages/MainPage'));
const MyPage = lazy(() => import(/* webpackChunkName: "myPage" */ '@pages/MyPage'));
const MyResume = lazy(() => import(/* webpackChunkName: "myResume" */ '@pages/MyResume'));
const Resume = lazy(() => import(/* webpackChunkName: "resume" */ '@pages/Resume'));
const ResumeDetail = lazy(() => import(/* webpackChunkName: "resumeDetail" */ '@pages/ResumeDetail'));
const ResumeUpdate = lazy(() => import(/* webpackChunkName: "resumeUpdate" */ '@pages/ResumeUpdate'));
const ResumeUpload = lazy(() => import(/* webpackChunkName: "resumeUpload" */ '@pages/ResumeUpload'));
const SocialLogin = lazy(() => import(/* webpackChunkName: "socialLogin" */ '@pages/SocialLogin'));
const PrivateRoute = lazy(() => import(/* webpackChunkName: "privateRoute" */ '@components/PrivateRoute'));

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const router = createBrowserRouter([
  {
    path: ROUTE_PATH.ROOT,
    errorElement: (
      <ErrorPage
        title="페이지를 찾을 수 없습니다."
        description="올바른 주소를 입력했는지 다시 확인해주세요."
      />
    ),
    element: (
      <TokenRefresh>
        <ErrorBoundary>
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
        </ErrorBoundary>
      </TokenRefresh>
    ),
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: ROUTE_PATH.MY_PAGE,
        element: (
          <PrivateRoute>
            <MyPage />
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRoute>
            <MyResume />
          </PrivateRoute>
        ),
      },
      {
        path: ROUTE_PATH.RESUME_UPLOAD,
        element: (
          <PrivateRoute>
            <ResumeUpload />
          </PrivateRoute>
        ),
      },
      {
        path: `${ROUTE_PATH.RESUME_UPDATE}/:resumeId`,
        element: (
          <PrivateRoute>
            <ResumeUpdate />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: ROUTE_PATH.ROOT,
    element: <Outlet />,
    children: [{ path: ROUTE_PATH.SOCIAL_LOGIN, element: <SocialLogin /> }],
  },
]);

export default router;
