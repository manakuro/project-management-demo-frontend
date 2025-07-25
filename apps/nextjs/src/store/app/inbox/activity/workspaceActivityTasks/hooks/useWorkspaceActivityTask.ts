import { useAtomValue } from 'jotai';
import { workspaceActivityTaskState } from '../atom';

export const useWorkspaceActivityTask = (workspaceActivityTaskId: string) => {
  const workspaceActivityTask = useAtomValue(
    workspaceActivityTaskState(workspaceActivityTaskId),
  );

  return {
    workspaceActivityTask,
  };
};
