import { useRecoilValue } from 'recoil';
import { projectTeammateIdsByProjectIdSortedByOwnerState } from '../atom';

export const useProjectTeammateIdsByProjectIdSortedByOwner = (
  projectId: string,
) => {
  const projectTeammateIds = useRecoilValue(
    projectTeammateIdsByProjectIdSortedByOwnerState(projectId),
  );

  return {
    projectTeammateIds,
  };
};
