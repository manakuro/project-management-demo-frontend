import { useAtomValue } from 'jotai';
import { projectTeammateIdsByProjectIdSortedByOwnerState } from '../atom';

export const useProjectTeammateIdsByProjectIdSortedByOwner = (
  projectId: string,
) => {
  const projectTeammateIds = useAtomValue(
    projectTeammateIdsByProjectIdSortedByOwnerState(projectId),
  );

  return {
    projectTeammateIds,
  };
};
