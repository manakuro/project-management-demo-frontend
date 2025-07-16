import { useRecoilCallback } from 'recoil';
import { uniqBy } from 'src/shared/utils';
import { type TaskResponse, useTasksResponse } from 'src/store/entities/task';
import { deletedTaskState } from '../atom';
import type { DeletedTaskResponse } from '../type';

export const useDeletedTaskResponse = () => {
  const { setTasksFromResponse } = useTasksResponse();

  const setDeletedTask = useRecoilCallback(
    ({ set }) =>
      (data: DeletedTaskResponse[], options?: { includeTask: boolean }) => {
        const includeTask = options?.includeTask ?? true;
        data.forEach((d) => {
          set(deletedTaskState(d.id), d);
        });

        if (!includeTask) return;

        const tasks = data.map<TaskResponse>((d) => ({
          ...d.task,
          taskSectionId: '',
        }));

        setTasksFromResponse(uniqBy(tasks, 'id'));
      },
    [setTasksFromResponse],
  );

  return {
    setDeletedTask,
  };
};
