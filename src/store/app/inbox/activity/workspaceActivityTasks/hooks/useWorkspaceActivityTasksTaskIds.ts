import { useRecoilValue } from 'recoil'
import { workspaceActivityTasksTaskIdsSelector } from '../atom'

export const useWorkspaceActivityTasksTaskIds = () => {
  const taskIds = useRecoilValue(workspaceActivityTasksTaskIdsSelector)

  return {
    taskIds,
  }
}
