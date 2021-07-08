import { useMyTask } from 'src/store/app/myTasks'
import {
  TaskSection,
  defaultTaskSectionStateValue,
} from 'src/store/entities/taskSections'
import { TasksProviderProps } from './TasksProvider'

type Result = {
  taskIds: string[]
  addTask: () => Promise<string>
  taskSection: TaskSection
  setSectionName: (val: string) => Promise<void>
}
export type CreateUseTaskResult = ReturnType<typeof createUseTask>
export const initialUseTask = (): Result => ({
  taskIds: [],
  addTask: async () => '',
  taskSection: defaultTaskSectionStateValue(),
  setSectionName: async () => {},
})

export const createUseTask = (props: TasksProviderProps) => {
  return function useTaskByTaskSection(taskSectionId: string): Result {
    const useMyTasksResult = useMyTask(taskSectionId)

    if (props.isMyTasksPage) {
      return {
        taskIds: useMyTasksResult.taskIds,
        addTask: useMyTasksResult.addTask,
        taskSection: useMyTasksResult.taskSection,
        setSectionName: useMyTasksResult.setSectionName,
      }
    }

    return initialUseTask()
  }
}
