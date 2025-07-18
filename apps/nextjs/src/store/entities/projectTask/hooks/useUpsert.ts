import { useRecoilCallback } from 'recoil';
import { projectTaskState } from '../atom';
import type { ProjectTask } from '../type';

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (input: ProjectTask) => {
        set(projectTaskState(input.id), input);
      },
    [],
  );

  return {
    upsert,
  };
};
