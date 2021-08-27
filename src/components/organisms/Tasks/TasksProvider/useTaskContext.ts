import { useMyTaskByTaskSectionId } from 'src/store/app/myTasks'
import {
  TaskSection,
  defaultTaskSectionStateValue,
} from 'src/store/entities/taskSections'
import { useTasksContext } from './TasksProvider'

type Result = {
  taskIds: string[]
  addTask: () => Promise<string>
  taskSection: TaskSection
  setSectionName: (val: string) => Promise<void>
}

export const initialUseTask = (): Result => ({
  taskIds: [],
  addTask: async () => '',
  taskSection: defaultTaskSectionStateValue(),
  setSectionName: async () => {},
})

export const useTaskContext = (taskSectionId: string): Result => {
  const { isMyTasksPage } = useTasksContext()
  const useMyTasksResult = useMyTaskByTaskSectionId(taskSectionId)

  if (isMyTasksPage) {
    return {
      taskIds: useMyTasksResult.taskIds,
      addTask: useMyTasksResult.addTask,
      taskSection: useMyTasksResult.taskSection,
      setSectionName: useMyTasksResult.setSectionName,
    }
  }

  return initialUseTask()
}
