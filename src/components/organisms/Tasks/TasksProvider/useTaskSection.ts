import { useMyTaskCommands, useMyTasks } from 'src/store/app/myTasks'
import { TasksProviderProps } from './TasksProvider'

type Result = {
  taskSectionIds: string[]
  taskIds: string[]
  addTaskSection: () => string
}
export type UseTaskSectionResult = Result
export const initialUseTaskSectionIds = (): Result => ({
  taskSectionIds: [],
  taskIds: [],
  addTaskSection: () => '',
})
export const useTaskSection = (props: TasksProviderProps): Result => {
  const { taskSectionIds, taskIds } = useMyTasks()
  const { addMyTaskSection } = useMyTaskCommands()

  if (props.myTasks) {
    return {
      taskSectionIds,
      taskIds,
      addTaskSection: addMyTaskSection,
    }
  }

  return initialUseTaskSectionIds()
}
