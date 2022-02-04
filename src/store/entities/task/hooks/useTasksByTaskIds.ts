import { useRecoilValue } from 'recoil'
import { tasksByTaskIdsState } from '../atom'

export const useTasksByTaskIds = (taskIds: string[]) => {
  const tasks = useRecoilValue(tasksByTaskIdsState(taskIds))

  return {
    tasks,
  }
}
