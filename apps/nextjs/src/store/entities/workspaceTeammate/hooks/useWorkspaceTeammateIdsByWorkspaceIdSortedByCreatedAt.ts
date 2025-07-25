import { useAtomValue } from 'jotai';
import { workspaceTeammateIdsByWorkspaceIdSortedByCreatedAtState } from '../atom';

export const useWorkspaceTeammateIdsByWorkspaceIdSortedByCreatedAt = (
  workspaceId: string,
) => {
  const workspaceTeammateIds = useAtomValue(
    workspaceTeammateIdsByWorkspaceIdSortedByCreatedAtState(workspaceId),
  );

  return {
    workspaceTeammateIds,
  };
};
