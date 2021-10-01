import { useRecoilValue } from 'recoil'
import { taskIdsByMyTaskActivityIdState } from '../atom'

export const useMyTaskActivityTasksTaskIds = (taskActivityId: string) => {
  const taskIds = useRecoilValue(taskIdsByMyTaskActivityIdState(taskActivityId))

  return {
    taskIds,
  }
}
