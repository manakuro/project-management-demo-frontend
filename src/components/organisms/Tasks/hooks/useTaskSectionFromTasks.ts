import { useMyTaskByTaskSectionId } from 'src/store/app/myTasks'
import {
  TaskSection,
  defaultTaskSectionStateValue,
} from 'src/store/entities/taskSections'
import { useTasksContext } from '../TasksProvider'

type Result = {
  taskSection: TaskSection
  setSectionName: (val: string) => Promise<void>
}

export const initialUseTask = (): Result => ({
  taskSection: defaultTaskSectionStateValue(),
  setSectionName: async () => {},
})

export const useTaskSectionFromTasks = (taskSectionId: string): Result => {
  const { isMyTasksPage } = useTasksContext()
  const useMyTasksResult = useMyTaskByTaskSectionId(taskSectionId)

  if (isMyTasksPage) {
    return {
      taskSection: useMyTasksResult.taskSection,
      setSectionName: useMyTasksResult.setSectionName,
    }
  }

  return initialUseTask()
}
