import React, { ComponentProps, FunctionComponent, ReactNode, createContext, useContext } from 'react';

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
    document.body.style.overflow = 'hidden';

    setModals((prev) => [...prev, { Component, props: { ...props, isOpen: true }, id }]);
  };

  const pop = (id: ModalIdType) => {
    const hasModal = Modals.length > 0;

    if (!hasModal) {
      document.body.style.overflow = 'auto';
    }

    setModals((prev) => prev.filter((C) => C.id !== id));
  };

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
