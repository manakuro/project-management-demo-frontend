import { useTasksTaskIdsByTaskSectionId } from './useTasksTaskIdsByTaskSectionId'

type Result = {
  hasTasks: boolean
}

export const useHasTasksByTaskSectionId = (taskSectionId: string): Result => {
  const { taskIds } = useTasksTaskIdsByTaskSectionId(taskSectionId)

  return {
    hasTasks: !!taskIds.length,
  }
}
