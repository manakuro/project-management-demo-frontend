import { useAtomValue } from 'jotai';
import { archivedWorkspaceActivityState } from '../atom';

export const useArchivedWorkspaceActivity = (
  archivedWorkspaceActivityId: string,
) => {
  const archivedWorkspaceActivity = useAtomValue(
    archivedWorkspaceActivityState(archivedWorkspaceActivityId),
  );

  return {
    archivedWorkspaceActivity,
  };
};
