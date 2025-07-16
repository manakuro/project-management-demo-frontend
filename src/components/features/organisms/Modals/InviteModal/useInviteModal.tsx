import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';

const key = (str: string) =>
  `src/components/organisms/Modals/InviteModal/useInviteModal/${str}`;

const openState = atom({
  key: key('openState'),
  default: false,
});

export const useInviteModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(openState);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return {
    isOpen,
    setIsOpen,
    onClose,
  };
};
