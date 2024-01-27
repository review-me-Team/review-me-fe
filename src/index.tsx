import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ReviewMeProvider } from 'review-me-design-system';
import { GlobalStyle } from '@styles/GlobalStyle';
import router from './router';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  const { worker } = await import('./mocks/browser');

  return worker.start();
}

const main = () =>
  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <ReviewMeProvider>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ReviewMeProvider>
    </React.StrictMode>,
  );

enableMocking().then(() => main());
