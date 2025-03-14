import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReviewMeProvider } from 'review-me-design-system';
import ModalProvider from '@contexts/modalContext';
import { ToastProvider } from '@contexts/toastContext';
import { UserProvider } from '@contexts/userContext';
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
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ReviewMeProvider>
          <GlobalStyle />
          <UserProvider>
            <ModalProvider>
              <ToastProvider>
                <RouterProvider router={router} />
              </ToastProvider>
            </ModalProvider>
          </UserProvider>
        </ReviewMeProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
};

main();
