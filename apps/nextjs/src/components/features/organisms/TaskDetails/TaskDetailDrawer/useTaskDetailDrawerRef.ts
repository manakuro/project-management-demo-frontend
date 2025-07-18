import { useEffect, useRef } from 'react';
import { atom, useRecoilState } from 'recoil';

const key = (str: string) =>
  `src/components/organisms/TaskDetails/TaskDetailDrawer/useTaskDetailDrawerRef/${str}`;

type State = HTMLElement | null;

const refState = atom<State>({
  key: key('refState'),
  default: null,
});

export const useTaskDetailDrawerRef = (deps?: any) => {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useRecoilState(refState);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (ref.current) {
      setState(ref.current);
    }
  }, [setState, deps]);

  return {
    ref,
    taskDetailListDetailRef: state,
  };
};
