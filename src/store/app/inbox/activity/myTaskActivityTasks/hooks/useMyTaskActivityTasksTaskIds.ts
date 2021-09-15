import { useRecoilValue } from 'recoil'
import { taskIdsByMyTaskActivityIdSelector } from '../atom'

export const useMyTaskActivityTasksTaskIds = (taskActivityId: string) => {
  const taskIds = useRecoilValue(
    taskIdsByMyTaskActivityIdSelector(taskActivityId),
  )

  return {
    taskIds,
  }
}
