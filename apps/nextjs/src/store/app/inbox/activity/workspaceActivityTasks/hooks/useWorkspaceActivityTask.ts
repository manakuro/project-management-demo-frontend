import { useRecoilValue } from 'recoil';
import { workspaceActivityTaskState } from '../atom';

export const useWorkspaceActivityTask = (workspaceActivityTaskId: string) => {
  const workspaceActivityTask = useRecoilValue(
    workspaceActivityTaskState(workspaceActivityTaskId),
  );

  return {
    workspaceActivityTask,
  };
};
