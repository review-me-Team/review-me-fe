import { v4 as uuidv4 } from 'uuid';
import { useModalContext } from '@contexts/modalContext';

type ModalComponentFunctionType = (params: { isOpen: boolean; onClose: () => void }) => JSX.Element;

const useModals = () => {
  const { push } = useModalContext();

  const open = (modalComponent: ModalComponentFunctionType) => {
    const id = uuidv4();
    push({ id, modalComponent });
  };

  return { open };
};

export default useModals;
