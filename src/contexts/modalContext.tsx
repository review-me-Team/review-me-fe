import React, { ReactNode, createContext, useContext, useEffect } from 'react';
import { manageBodyScroll } from '@utils';

type ModalIdType = string;

type ModalComponentFunctionType = (params: { isOpen: boolean; onClose: () => void }) => JSX.Element;

interface ModalType {
  id: ModalIdType;
  isOpen: boolean;
  modalComponent: ModalComponentFunctionType;
}

type PushType = ({ modalComponent, id }: Omit<ModalType, 'isOpen'>) => void;
type PopType = (id: ModalIdType) => void;

interface ModalContext {
  push: PushType;
  pop: PopType;
}

const ModalContext = createContext<ModalContext | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }

  return context;
};

const ModalController = ({
  isOpen,
  modalController: ModalComponent,
  unmount,
}: {
  isOpen: boolean;
  modalController: ModalComponentFunctionType;
  unmount: () => void;
}) => {
  return <ModalComponent isOpen={isOpen} onClose={unmount} />;
};

interface ModalProviderProps {
  children: ReactNode;
}

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalList, setModalList] = React.useState<ModalType[]>([]);

  const push: PushType = ({ modalComponent, id }) => {
    manageBodyScroll(false);

    setModalList((prev) => [...prev, { modalComponent, id, isOpen: true }]);
  };

  const pop: PopType = (id) => {
    setModalList((prev) => prev.filter((C) => C.id !== id));

    if (modalList.length === 1) {
      manageBodyScroll(true);
    }
  };

  const removeAll = () => {
    setModalList([]);
    manageBodyScroll(true);
  };

  useEffect(() => {
    return () => {
      removeAll();
    };
  }, []);

  return (
    <ModalContext.Provider value={{ push, pop }}>
      {children}
      {modalList.map(({ id, modalComponent, isOpen }) => (
        <ModalController key={id} isOpen={isOpen} modalController={modalComponent} unmount={() => pop(id)} />
      ))}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
