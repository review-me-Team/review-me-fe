import { ComponentProps, FunctionComponent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useModalContext } from '@contexts/modalContext';
import useKeyPress from './useKeyPress';

const useModals = () => {
  const { push, pop, modals } = useModalContext();

  const open = (Component: FunctionComponent<any>, props: ComponentProps<FunctionComponent<any>> = {}) => {
    const id = uuidv4();
    push({ Component, props, id });

    return id;
  };

  const close = (id: string) => {
    pop(id);
  };

  const closeLast = () => {
    if (modals.length === 0) return;

    pop(modals[modals.length - 1].id);
  };

  useKeyPress({
    targetKey: 'Escape',
    onKeyPress: closeLast,
  });

  return { open, close };
};

export default useModals;
