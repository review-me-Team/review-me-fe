import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icon, theme } from 'review-me-design-system';
import { useToastContext } from '@contexts/toastContext';
import { ToastLayout, IconButton } from './style';

const Toast = () => {
  const { toast, closeToast } = useToastContext();

  useEffect(() => {
    const timeId = setTimeout(() => {
      closeToast();
    }, 2000);

    return () => {
      clearTimeout(timeId);
    };
  });

  if (!toast) return null;

  return createPortal(
    <ToastLayout $isOpen={!!toast} $type={toast.type}>
      {toast.message}
      <IconButton onClick={closeToast}>
        <Icon iconName="xMark" color={theme.color.neutral.text.weak} width={16} height={16} />
      </IconButton>
    </ToastLayout>,
    document.getElementById('toast-root')!,
  );
};

export default Toast;
