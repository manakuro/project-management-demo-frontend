import { useRecoilValue } from 'recoil'
import { taskIdsState } from '../atom'

export const useTasks = () => {
  const taskIds = useRecoilValue(taskIdsState)

  return {
    taskIds,
  }
}
