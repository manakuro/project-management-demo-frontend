import { useRecoilValue } from 'recoil'
import { taskActivityTaskSelector } from '../atom'

export const useTaskActivityTask = (taskActivityTaskId: string) => {
  const taskActivityTask = useRecoilValue(
    taskActivityTaskSelector(taskActivityTaskId),
  )

  return {
    taskActivityTask,
  }
}
