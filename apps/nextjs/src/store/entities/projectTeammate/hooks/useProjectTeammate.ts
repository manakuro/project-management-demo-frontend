import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { projectTeammateState } from '../atom';

export const useProjectTeammate = (projectTeammateId: string) => {
  const projectTeammate = useRecoilValue(
    projectTeammateState(projectTeammateId),
  );
  const role = useMemo(() => {
    if (projectTeammate.role) return projectTeammate.role;
    if (projectTeammate.isOwner) return 'Project Owner';
    return '';
  }, [projectTeammate.isOwner, projectTeammate.role]);

  return {
    projectTeammate,
    role,
  };
};
