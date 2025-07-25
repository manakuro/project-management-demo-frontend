import { atomFamily } from 'jotai/utils';
import { useAtomValue, useAtomCallback } from 'jotai';
import { useCallback } from 'react';

const hasDescriptionUpdatedState = atomFamily<string, number>(
  () => 1,
);

type Props = {
  projectId: string;
};

export const useHasDescriptionUpdatedValue = (props: Props) => {
  const hasDescriptionUpdated = useAtomValue(
    hasDescriptionUpdatedState(props.projectId),
  );

  return {
    hasDescriptionUpdated,
  };
};

export const useSetHasDescriptionUpdated = () => {
  const setHasDescriptionUpdated = useAtomCallback(
    useCallback(
      async (get, set, projectId: string) => {
        const prev = get(hasDescriptionUpdatedState(projectId));
        set(hasDescriptionUpdatedState(projectId), prev + 1);
      },
      [],
    ),
  );

  return {
    setHasDescriptionUpdated,
  };
};
