import { useRecoilValue } from 'recoil'
import { tasksByTaskIds } from '../atom'

export const useTasksByTaskIds = (taskIds: string[]) => {
  const tasks = useRecoilValue(tasksByTaskIds(taskIds))

  return {
    tasks,
  }
}
