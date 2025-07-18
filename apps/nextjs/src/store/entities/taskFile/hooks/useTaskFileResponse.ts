import { useRecoilCallback } from 'recoil';
import { taskFileState } from '../atom';
import type { TaskFileResponse } from '../type';

export const useTaskFileResponse = () => {
  const setTaskFiles = useRecoilCallback(
    ({ set }) =>
      (data: TaskFileResponse[]) => {
        data.forEach((d) => {
          set(taskFileState(d.id), d);
        });
      },
    [],
  );

  return {
    setTaskFiles,
  };
};
