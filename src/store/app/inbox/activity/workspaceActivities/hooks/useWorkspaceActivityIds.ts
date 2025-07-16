import { useRecoilValue } from 'recoil';
import { workspaceActivityIdsState } from '../atom';

export const useWorkspaceActivityIds = () => {
  const workspaceActivityIds = useRecoilValue(workspaceActivityIdsState);

  return {
    workspaceActivityIds,
  };
};
