export type ModalConfirmProps = {
  isOpen: boolean;
  title: string;
  description?: string;
  onContinue: () => void;
  onCancel: () => void;
  disableButton: boolean;
};
