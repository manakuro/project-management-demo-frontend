import { useRecoilValue } from 'recoil';
import { ownerProjectTeammateByProjectIdState } from '../atom';

export const useOwnerTeammateIdsByProjectId = (projectId: string) => {
  const projectTeammate = useRecoilValue(
    ownerProjectTeammateByProjectIdState(projectId),
  );

  return {
    projectTeammate,
  };
};
