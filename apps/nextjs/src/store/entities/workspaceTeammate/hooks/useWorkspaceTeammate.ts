import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { workspaceTeammateState } from '../atom';

export const useWorkspaceTeammate = (workspaceTeammateId: string) => {
  const workspaceTeammate = useAtomValue(
    workspaceTeammateState(workspaceTeammateId),
  );
  const role = useMemo(() => {
    if (workspaceTeammate.role) return workspaceTeammate.role;
    if (workspaceTeammate.isOwner) return 'Project Owner';
    return '';
  }, [workspaceTeammate.isOwner, workspaceTeammate.role]);

  return {
    workspaceTeammate,
    role,
  };
};
