import { useRecoilValue } from 'recoil'
import { taskActivityTaskState } from '../atom'

export const useTaskActivityTask = (taskActivityTaskId: string) => {
  const taskActivityTask = useRecoilValue(
    taskActivityTaskState(taskActivityTaskId),
  )

  return {
    taskActivityTask,
  }
}
