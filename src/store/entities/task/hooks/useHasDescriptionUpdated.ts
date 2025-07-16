import { atomFamily, useRecoilCallback, useRecoilValue } from 'recoil';

const key = (str: string) =>
  `src/store/entities/task/hooks/useHasDescriptionUpdated/${str}`;

const hasDescriptionUpdatedState = atomFamily<number, string>({
  key: key('hasDescriptionUpdatedState'),
  default: 1,
});

type Props = {
  taskId: string;
};

export const useHasDescriptionUpdatedValue = (props: Props) => {
  const hasDescriptionUpdated = useRecoilValue(
    hasDescriptionUpdatedState(props.taskId),
  );

  return {
    hasDescriptionUpdated,
  };
};

export const useSetHasDescriptionUpdated = () => {
  const setHasDescriptionUpdated = useRecoilCallback(
    ({ set }) =>
      async (taskId: string) => {
        set(hasDescriptionUpdatedState(taskId), (prev) => prev + 1);
      },
    [],
  );

  return {
    setHasDescriptionUpdated,
  };
};
