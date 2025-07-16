import { useRecoilValue } from 'recoil';
import { workspaceActivityState } from '../atom';

export const useWorkspaceActivity = (workspaceActivityId: string) => {
  const workspaceActivity = useRecoilValue(
    workspaceActivityState(workspaceActivityId),
  );

  return {
    workspaceActivity,
  };
};
