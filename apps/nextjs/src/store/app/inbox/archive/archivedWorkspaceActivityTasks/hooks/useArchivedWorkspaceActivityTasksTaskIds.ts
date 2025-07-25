import { useAtomValue } from 'jotai';
import { taskIdsByArchivedWorkspaceActivityIdState } from '../atom';

export const useArchivedWorkspaceActivityTasksTaskIds = (
  archivedWorkspaceActivityId: string,
) => {
  const taskIds = useAtomValue(
    taskIdsByArchivedWorkspaceActivityIdState(archivedWorkspaceActivityId),
  );

  return {
    taskIds,
  };
};
