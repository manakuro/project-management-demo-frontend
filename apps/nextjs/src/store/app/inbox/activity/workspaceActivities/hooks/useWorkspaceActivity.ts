import { useAtomValue } from 'jotai';
import { workspaceActivityState } from '../atom';

export const useWorkspaceActivity = (workspaceActivityId: string) => {
  const workspaceActivity = useAtomValue(
    workspaceActivityState(workspaceActivityId),
  );

  return {
    workspaceActivity,
  };
};
