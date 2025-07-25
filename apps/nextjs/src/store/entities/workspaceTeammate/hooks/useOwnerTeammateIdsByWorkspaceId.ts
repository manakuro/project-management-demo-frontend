import { useAtomValue } from 'jotai';
import { ownerWorkspaceTeammateByWorkspaceIdState } from '../atom';

export const useOwnerTeammateIdsByWorkspaceId = (workspaceId: string) => {
  const workspaceTeammate = useAtomValue(
    ownerWorkspaceTeammateByWorkspaceIdState(workspaceId),
  );

  return {
    workspaceTeammate,
  };
};
