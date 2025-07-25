import { useAtomValue } from 'jotai';
import { workspaceTeammateIdsByWorkspaceIdState } from '../atom';

export const useWorkspaceTeammateIdsByWorkspaceId = (workspaceId: string) => {
  const workspaceTeammateIds = useAtomValue(
    workspaceTeammateIdsByWorkspaceIdState(workspaceId),
  );

  return {
    workspaceTeammateIds,
  };
};
