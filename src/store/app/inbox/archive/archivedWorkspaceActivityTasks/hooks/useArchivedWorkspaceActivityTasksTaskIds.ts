import { useRecoilValue } from 'recoil';
import { taskIdsByArchivedWorkspaceActivityIdState } from '../atom';

export const useArchivedWorkspaceActivityTasksTaskIds = (
  archivedWorkspaceActivityId: string,
) => {
  const taskIds = useRecoilValue(
    taskIdsByArchivedWorkspaceActivityIdState(archivedWorkspaceActivityId),
  );

  return {
    taskIds,
  };
};
