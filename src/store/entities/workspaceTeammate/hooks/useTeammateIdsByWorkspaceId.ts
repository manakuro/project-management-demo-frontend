import { useRecoilValue } from 'recoil';
import { teammateIdsByWorkspaceIdState } from '../atom';

export const useTeammateIdsByWorkspaceId = (projectId: string) => {
  const teammateIds = useRecoilValue(teammateIdsByWorkspaceIdState(projectId));

  return {
    teammateIds,
  };
};
