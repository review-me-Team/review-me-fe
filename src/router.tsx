import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import MainPage from '@pages/MainPage';
import MyPage from '@pages/MyPage';
import MyResume from '@pages/MyResume';
import Resume from '@pages/Resume';
import ResumeDetail from '@pages/ResumeDetail';
import { ROUTE_PATH } from '@constants';

const router = createBrowserRouter([
  { path: ROUTE_PATH.ROOT, element: <MainPage /> },
  { path: ROUTE_PATH.MY_PAGE, element: <MyPage /> },
  { path: ROUTE_PATH.RESUME, element: <Resume /> },
  { path: `${ROUTE_PATH.RESUME}/:id`, element: <ResumeDetail /> },
  { path: ROUTE_PATH.MY_RESUME, element: <MyResume /> },
]);

export default router;
