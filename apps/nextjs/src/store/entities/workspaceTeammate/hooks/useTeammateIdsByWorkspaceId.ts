import { useAtomValue } from 'jotai';
import { teammateIdsByWorkspaceIdState } from '../atom';

export const useTeammateIdsByWorkspaceId = (projectId: string) => {
  const teammateIds = useAtomValue(teammateIdsByWorkspaceIdState(projectId));

  return {
    teammateIds,
  };
};
