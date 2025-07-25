import { useAtomValue } from 'jotai';
import { workspaceTeammateIdsByWorkspaceIdSortedByOwnerState } from '../atom';

export const useWorkspaceTeammateIdsByWorkspaceIdSortedByOwner = (
  workspaceId: string,
) => {
  const workspaceTeammateIds = useAtomValue(
    workspaceTeammateIdsByWorkspaceIdSortedByOwnerState(workspaceId),
  );

  return {
    workspaceTeammateIds,
  };
};
