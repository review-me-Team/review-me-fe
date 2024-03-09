import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReviewMeProvider } from 'review-me-design-system';
import { GlobalStyle } from '@styles/GlobalStyle';
import router from './router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
    mutations: {
      retry: 1,
    },
  },
});

const main = async () => {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ReviewMeProvider>
          <GlobalStyle />
          <RouterProvider router={router} />
        </ReviewMeProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
};

main();
