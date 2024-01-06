import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ReviewMeProvider } from 'review-me-design-system';
import router from './router';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReviewMeProvider>
      <RouterProvider router={router} />
    </ReviewMeProvider>
  </React.StrictMode>,
);
