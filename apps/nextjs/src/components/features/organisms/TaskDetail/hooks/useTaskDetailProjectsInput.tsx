import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';

const key = (str: string) =>
  `src/components/organisms/TaskDetail/hooks/useTaskDetailProjectsInput/${str}`;

const modalState = atom<boolean>({
  key: key('modalState'),
  default: false,
});

export const useTaskDetailProjectsInput = () => {
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return {
    isOpen,
    onOpen,
    onClose,
  };
};
