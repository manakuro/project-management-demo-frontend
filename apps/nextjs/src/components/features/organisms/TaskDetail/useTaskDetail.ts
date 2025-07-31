import { atom, useAtom } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils';

const loadingAtom = atom<boolean>(false);

const idAtom = atomWithReset<string>('');

const scrollIdAtom = atomWithReset<string>('');

export const useTaskDetail = () => {
  const [id, setId] = useAtom(idAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [scrollId, setScrollId] = useAtom(scrollIdAtom);
  const resetScrollId = useResetAtom(scrollIdAtom);
  const resetId = useResetAtom(idAtom);

  return {
    loading,
    taskId: id,
    scrollId,
    setScrollId,
    setId,
    setLoading,
    resetScrollId,
    resetId,
  };
};
