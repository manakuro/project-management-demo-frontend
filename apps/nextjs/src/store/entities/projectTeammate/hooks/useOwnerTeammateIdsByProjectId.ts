import { useAtomValue } from 'jotai';
import { ownerProjectTeammateByProjectIdState } from '../atom';

export const useOwnerTeammateIdsByProjectId = (projectId: string) => {
  const projectTeammate = useAtomValue(
    ownerProjectTeammateByProjectIdState(projectId),
  );

  return {
    projectTeammate,
  };
};
