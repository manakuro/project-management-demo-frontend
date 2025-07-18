import { useRecoilValue } from 'recoil';
import { projectTeammateIdsByProjectIdSortedByCreatedAtState } from '../atom';

export const useProjectTeammateIdsByProjectIdSortedByCreatedAt = (
  projectId: string,
) => {
  const projectTeammateIds = useRecoilValue(
    projectTeammateIdsByProjectIdSortedByCreatedAtState(projectId),
  );

  return {
    projectTeammateIds,
  };
};
