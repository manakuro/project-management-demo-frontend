import { useRecoilValue } from 'recoil';
import { taskIdsByWorkspaceActivityIdState } from '../atom';

export const useWorkspaceActivityTasksTaskIds = (
  workspaceActivityId: string,
) => {
  const taskIds = useRecoilValue(
    taskIdsByWorkspaceActivityIdState(workspaceActivityId),
  );

  return {
    taskIds,
  };
};
