export type ModalIdType = string;

export type ModalComponentFunctionType = (params: { isOpen: boolean; onClose: () => void }) => JSX.Element;
