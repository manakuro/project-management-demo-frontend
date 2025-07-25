import { useAtomValue } from 'jotai';
import { taskIdsByWorkspaceActivityIdState } from '../atom';

export const useWorkspaceActivityTasksTaskIds = (
  workspaceActivityId: string,
) => {
  const taskIds = useAtomValue(
    taskIdsByWorkspaceActivityIdState(workspaceActivityId),
  );

  return {
    taskIds,
  };
};
