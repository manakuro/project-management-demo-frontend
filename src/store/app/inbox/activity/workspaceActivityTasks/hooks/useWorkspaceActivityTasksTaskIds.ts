import { useRecoilValue } from 'recoil'
import { taskIdsByWorkspaceActivityIdSelector } from '../atom'

export const useWorkspaceActivityTasksTaskIds = (
  workspaceActivityId: string,
) => {
  const taskIds = useRecoilValue(
    taskIdsByWorkspaceActivityIdSelector(workspaceActivityId),
  )

  return {
    taskIds,
  }
}
