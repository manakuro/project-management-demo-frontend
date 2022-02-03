import { useRecoilValue } from 'recoil'
import { tasksByTaskSectionIdState } from '../atom'

export const useTasksByTaskSectionId = (taskSectionId?: string) => {
  const tasks = useRecoilValue(tasksByTaskSectionIdState(taskSectionId || ''))

  return {
    tasks,
  }
}
