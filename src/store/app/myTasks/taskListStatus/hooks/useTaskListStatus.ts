import { useRecoilValue } from 'recoil'
import { taskListStatusState } from '../atom'

export const useTaskListStatus = () => {
  const taskListStatus = useRecoilValue(taskListStatusState)

  return {
    taskListStatus,
  }
}
