import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';

const state = atom({
  key: 'helpState',
  default: false,
});

export const useHelp = () => {
  const [isOpen, setIsOpen] = useRecoilState(state);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return {
    isOpen,
    setIsOpen,
    onClose,
  };
};
