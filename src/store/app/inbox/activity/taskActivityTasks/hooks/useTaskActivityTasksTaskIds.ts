import { useRecoilValue } from 'recoil'
import { taskIdsByTaskActivityIdSelector } from '../atom'

export const useTaskActivityTasksTaskIds = (workspaceActivityId: string) => {
  const taskIds = useRecoilValue(
    taskIdsByTaskActivityIdSelector(workspaceActivityId),
  )

  return {
    taskIds,
  }
}
