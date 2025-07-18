import { useCallback } from 'react';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';

const key = (str: string) =>
  `src/components/organisms/Modals/FileViewerModal/useFileViewerModal/${str}`;

const openState = atom({
  key: key('fileViewerOpenState'),
  default: false,
});

type State = {
  currentTaskFileId: string;
  taskFileIds: string[];
};
const fileViewerState = atom<State>({
  key: key('fileViewerState'),
  default: {
    currentTaskFileId: '',
    taskFileIds: [],
  },
});

export const useFileViewerModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(openState);
  const [state, setState] = useRecoilState(fileViewerState);
  const resetState = useResetRecoilState(fileViewerState);

  const onClose = useCallback(() => {
    setIsOpen(false);
    resetState();
  }, [resetState, setIsOpen]);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return {
    isOpen,
    onOpen,
    onClose,
    ...state,
    setState,
  };
};
