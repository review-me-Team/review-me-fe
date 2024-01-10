import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ReviewMeProvider } from 'review-me-design-system';
import { GlobalStyle } from '@styles/GlobalStyle';
import router from './router';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReviewMeProvider>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ReviewMeProvider>
  </React.StrictMode>,
);
