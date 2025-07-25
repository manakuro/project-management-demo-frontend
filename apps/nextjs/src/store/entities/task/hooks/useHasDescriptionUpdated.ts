import { atom } from 'jotai';
import { useAtomValue, useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';

const hasDescriptionUpdatedState = (taskId: string) =>
  atom<number>(1);

type Props = {
  taskId: string;
};

export const useHasDescriptionUpdatedValue = (props: Props) => {
  const hasDescriptionUpdated = useAtomValue(
    hasDescriptionUpdatedState(props.taskId),
  );

  return {
    hasDescriptionUpdated,
  };
};

export const useSetHasDescriptionUpdated = () => {
  const setHasDescriptionUpdated = useAtomCallback(
    useCallback(async (get, set, taskId: string) => {
      const prev = get(hasDescriptionUpdatedState(taskId));
      set(hasDescriptionUpdatedState(taskId), prev + 1);
    }, []),
  );

  return {
    setHasDescriptionUpdated,
  };
};
