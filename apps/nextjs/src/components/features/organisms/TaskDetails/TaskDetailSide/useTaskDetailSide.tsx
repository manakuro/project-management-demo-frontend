import { useTaskDetail } from '@/components/features/organisms/TaskDetail';
import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const isOpenAtom = atom<boolean>(false);

export const useTaskDetailSide = () => {
  const { resetScrollId, resetId, taskId } = useTaskDetail();
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);

  const onClose = useCallback(async () => {
    setIsOpen(false);
    resetId();
    resetScrollId();
  }, [setIsOpen, resetId, resetScrollId]);

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
    taskId,
  };
};
