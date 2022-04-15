import { useRecoilValue } from 'recoil'
import { taskIdsByTaskActivityIdState } from '../atom'

export const useTaskActivityTasksTaskIds = (taskActivityId: string) => {
  const taskIds = useRecoilValue(taskIdsByTaskActivityIdState(taskActivityId))

  return {
    taskIds,
  }
}
