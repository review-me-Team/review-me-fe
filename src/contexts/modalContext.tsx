import React, {
  ComponentProps,
  FunctionComponent,
  ReactNode,
  createContext,
  useContext,
  useEffect,
} from 'react';
import { manageBodyScroll } from '@utils';

type ModalIdType = string;

interface ModalType {
  Component: FunctionComponent<any>;
  props: ComponentProps<FunctionComponent<any>>;
  id: ModalIdType;
}

interface ModalContext {
  modals: ModalType[];
  push: ({ Component, props, id }: ModalType) => void;
  pop: (id: string) => void;
}

const ModalContext = createContext<ModalContext | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }

  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [Modals, setModals] = React.useState<ModalType[]>([]);

  const push = ({ Component, props, id }: ModalType) => {
    setModals((prev) => [...prev, { Component, props: { ...props, isOpen: true }, id }]);
  };

  const pop = (id: ModalIdType) => {
    setModals((prev) => prev.filter((C) => C.id !== id));
  };

  useEffect(() => {
    if (Modals.length === 0) {
      manageBodyScroll(true);
      return;
    }

    manageBodyScroll(false);
  }, [Modals]);

  return (
    <ModalContext.Provider value={{ modals: Modals, push, pop }}>
      {children}
      {Modals.map(({ Component, props, id }) => (
        <Component key={id} {...props} />
      ))}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
