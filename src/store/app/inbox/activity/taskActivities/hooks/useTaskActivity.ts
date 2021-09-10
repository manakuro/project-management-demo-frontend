import { useRecoilValue } from 'recoil'
import { taskActivitySelector } from '../atom'

export const useTaskActivity = (taskActivityId: string) => {
  const taskActivity = useRecoilValue(taskActivitySelector(taskActivityId))

  return {
    taskActivity,
  }
}
