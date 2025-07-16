import { useRecoilCallback } from 'recoil';
import { useTasksResponse } from 'src/store/entities/task';
import { taskActivityTaskState } from '../atom';
import type { TaskActivityTaskResponse } from '../type';

export const useTaskActivityTasksResponse = () => {
  const { setTasksFromResponse } = useTasksResponse();

  const setTaskActivityTasks = useRecoilCallback(
    ({ set }) =>
      (data: TaskActivityTaskResponse[]) => {
        data.forEach((d) => {
          set(taskActivityTaskState(d.id), d);

          setTasksFromResponse([d.task]);
        });
      },
    [setTasksFromResponse],
  );

  return {
    setTaskActivityTasks,
  };
};
