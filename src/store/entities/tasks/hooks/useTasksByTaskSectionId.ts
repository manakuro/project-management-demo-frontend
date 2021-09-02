import { useRecoilValue } from 'recoil'
import { tasksByTaskSectionIdSelector } from '../atom'

export const useTasksByTaskSectionId = (taskSectionId?: string) => {
  const tasks = useRecoilValue(
    tasksByTaskSectionIdSelector(taskSectionId || ''),
  )

  return {
    tasks,
  }
}
