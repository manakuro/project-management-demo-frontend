import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';
import { useTaskDetail } from 'src/components/features/organisms/TaskDetail';

const isOpenAtom = atom(false);

export const useTaskDetailModal = () => {
  const { resetScrollId, resetId } = useTaskDetail();
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);

  const onClose = useCallback(() => {
    setIsOpen(false);
    resetId();
    resetScrollId();
  }, [resetId, resetScrollId, setIsOpen]);

  const onOpen = useCallback(
    (callback?: () => void) => {
      setIsOpen(true);
      callback?.();
    },
    [setIsOpen],
  );

  return {
    isOpen,
    onOpen,
    onClose,
  };
};
