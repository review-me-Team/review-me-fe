import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ReviewMeProvider } from 'review-me-design-system';
import { GlobalStyle } from '@styles/GlobalStyle';
import router from './router';

const main = async () => {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser');

    await worker.start();
  }

  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <ReviewMeProvider>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ReviewMeProvider>
    </React.StrictMode>,
  );
};

main();
