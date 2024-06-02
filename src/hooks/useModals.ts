import { ComponentProps, FunctionComponent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useModalContext } from '@contexts/modalContext';

const useModals = () => {
  const { push, pop } = useModalContext();

  const open = (Component: FunctionComponent<any>, props: ComponentProps<FunctionComponent<any>> = {}) => {
    const id = uuidv4();
    push({ Component, props, id });

    return id;
  };

  const close = (id: string) => {
    pop(id);
  };

  return { open, close };
};

export default useModals;
