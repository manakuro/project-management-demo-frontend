import { useRecoilCallback } from 'recoil';
import { useTasksResponse } from 'src/store/entities/task';
import { workspaceActivityTaskState } from '../atom';
import type { WorkspaceActivityTaskResponse } from '../type';

export const useWorkspaceActivityTasksResponse = () => {
  const { setTasksFromResponse } = useTasksResponse();

  const setWorkspaceActivityTasks = useRecoilCallback(
    ({ set }) =>
      (data: WorkspaceActivityTaskResponse[]) => {
        data.forEach((t) => {
          set(workspaceActivityTaskState(t.id), t);

          setTasksFromResponse([t.task]);
        });
      },
    [setTasksFromResponse],
  );

  return {
    setWorkspaceActivityTasks,
  };
};
