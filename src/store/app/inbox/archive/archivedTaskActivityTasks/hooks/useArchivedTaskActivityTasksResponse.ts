import { useRecoilCallback } from 'recoil';
import { useTasksResponse } from 'src/store/entities/task';
import { archivedTaskActivityTaskState } from '../atom';
import type { ArchivedTaskActivityTaskResponse } from '../type';

export const useArchivedTaskActivityTasksResponse = () => {
  const { setTasksFromResponse } = useTasksResponse();

  const setArchivedTaskActivityTasks = useRecoilCallback(
    ({ set }) =>
      (data: ArchivedTaskActivityTaskResponse[]) => {
        data.forEach((t) => {
          set(archivedTaskActivityTaskState(t.id), t);

          setTasksFromResponse([t.task]);
        });
      },
    [setTasksFromResponse],
  );

  return {
    setArchivedTaskActivityTasks,
  };
};
