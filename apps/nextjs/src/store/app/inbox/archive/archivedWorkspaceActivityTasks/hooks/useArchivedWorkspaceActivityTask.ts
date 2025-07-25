import { useAtomValue } from 'jotai';
import { archivedWorkspaceActivityTaskState } from '../atom';

export const useArchivedWorkspaceActivityTask = (
  archivedWorkspaceActivityTaskId: string,
) => {
  const archivedWorkspaceActivityTask = useAtomValue(
    archivedWorkspaceActivityTaskState(archivedWorkspaceActivityTaskId),
  );

  return {
    archivedWorkspaceActivityTask,
  };
};
