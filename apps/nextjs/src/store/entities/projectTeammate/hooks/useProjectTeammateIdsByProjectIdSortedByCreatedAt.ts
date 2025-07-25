import { useAtomValue } from 'jotai';
import { projectTeammateIdsByProjectIdSortedByCreatedAtState } from '../atom';

export const useProjectTeammateIdsByProjectIdSortedByCreatedAt = (
  projectId: string,
) => {
  const projectTeammateIds = useAtomValue(
    projectTeammateIdsByProjectIdSortedByCreatedAtState(projectId),
  );

  return {
    projectTeammateIds,
  };
};
