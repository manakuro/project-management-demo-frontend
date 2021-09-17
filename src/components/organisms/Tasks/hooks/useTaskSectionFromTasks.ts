import { useMyTasksTaskSection } from 'src/store/app/myTasks/taskSections'
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
  const useMyTasksTaskSectionResult = useMyTasksTaskSection(taskSectionId)

  if (isMyTasksPage) {
    return {
      taskSection: useMyTasksTaskSectionResult.taskSection,
      setSectionName: useMyTasksTaskSectionResult.setSectionName,
    }
  }

  return initialUseTask()
}
