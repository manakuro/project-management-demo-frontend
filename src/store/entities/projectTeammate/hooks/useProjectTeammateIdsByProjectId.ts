import { useRecoilValue } from 'recoil';
import { projectTeammateIdsByProjectIdState } from '../atom';

export const useProjectTeammateIdsByProjectId = (projectId: string) => {
  const projectTeammateIds = useRecoilValue(
    projectTeammateIdsByProjectIdState(projectId),
  );

  return {
    projectTeammateIds,
  };
};
