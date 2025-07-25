import { useAtomValue } from 'jotai';
import { projectTeammateIdsByProjectIdState } from '../atom';

export const useProjectTeammateIdsByProjectId = (projectId: string) => {
  const projectTeammateIds = useAtomValue(
    projectTeammateIdsByProjectIdState(projectId),
  );

  return {
    projectTeammateIds,
  };
};
