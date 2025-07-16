import { useRecoilCallback } from 'recoil';
import { taskListStatusState } from '../atom';
import type { TeammateTaskListStatus } from '../type';

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (input: Partial<TeammateTaskListStatus>) => {
        set(taskListStatusState, (prev) => ({
          ...prev,
          ...input,
        }));
      },
    [],
  );

  return {
    upsert,
  };
};
