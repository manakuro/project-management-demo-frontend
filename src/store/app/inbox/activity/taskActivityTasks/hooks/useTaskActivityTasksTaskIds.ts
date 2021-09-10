import { useRecoilValue } from 'recoil'
import { taskIdsByTaskActivityIdSelector } from '../atom'

export const useTaskActivityTasksTaskIds = (taskActivityId: string) => {
  const taskIds = useRecoilValue(
    taskIdsByTaskActivityIdSelector(taskActivityId),
  )

  return {
    taskIds,
  }
}
