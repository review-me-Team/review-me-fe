import React, { ReactNode, createContext, useContext, useState } from 'react';
import Toast from '@components/Toast';

interface Toast {
  type: 'success' | 'error';
  message: string;
}

interface ToastContext {
  toast: Toast | null;
  openToast: (toast: Toast) => void;
  closeToast: () => void;
}

const ToastContext = createContext<ToastContext | null>(null);

const useToastContext = () => {
  const toast = useContext(ToastContext);

  if (!toast) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }

  return toast;
};

interface ToastProviderProps {
  children: ReactNode;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<Toast | null>(null);
  const [isOpenToast, setIsOpenToast] = useState<boolean>(false);

  const openToast = (toast: Toast) => {
    setToast(toast);
    setIsOpenToast(true);
  };

  const closeToast = () => {
    setToast(null);
    setIsOpenToast(false);
  };

  return (
    <ToastContext.Provider value={{ toast, openToast, closeToast }}>
      {children}
      <Toast />
    </ToastContext.Provider>
  );
};

export { ToastProvider, useToastContext };
