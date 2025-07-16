import { useCallback } from 'react';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';

const key = (str: string) =>
  `src/components/organisms/Modals/EditorLinkModal/useEditorLinkModal/${str}`;

type State = {
  isOpen: boolean;
  x: number;
  y: number;
  input: {
    url: string;
  };
  callback: (input: State['input']) => void;
};

const modalState = atom<State>({
  key: key('editorLinkModalState'),
  default: {
    isOpen: false,
    x: 0,
    y: 0,
    input: {
      url: '',
    },
    callback: () => {},
  },
});

export const useEditorLinkModal = () => {
  const [state, setState] = useRecoilState(modalState);
  const resetState = useResetRecoilState(modalState);

  const onClose = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false }));
    state.callback(state.input);
    resetState();
  }, [resetState, setState, state]);

  const onOpen = useCallback(
    ({ x, y }: { x: State['x']; y: State['y'] }) => {
      return new Promise<State['input']>((resolve) => {
        setState((s) => ({
          ...s,
          isOpen: true,
          x,
          y,
          callback: resolve,
        }));
      });
    },
    [setState],
  );

  const setInput = useCallback(
    (input: State['input']) => {
      setState((s) => ({ ...s, input }));
    },
    [setState],
  );

  return {
    ...state,
    setInput,
    onOpen,
    onClose,
  };
};
