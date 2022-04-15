import { useRecoilValue } from 'recoil'
import { taskActivityState } from '../atom'

export const useTaskActivity = (myTaskActivityId: string) => {
  const taskActivity = useRecoilValue(taskActivityState(myTaskActivityId))

  return {
    taskActivity,
  }
}
