import { useAtomValue } from 'jotai';
import { teammateIdsByProjectIdState } from '../atom';

export const useTeammateIdsByProjectId = (projectId: string) => {
  const teammateIds = useAtomValue(teammateIdsByProjectIdState(projectId));

  return {
    teammateIds,
  };
};
