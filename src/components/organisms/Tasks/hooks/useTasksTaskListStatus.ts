import { useMyTasksTaskListStatus } from 'src/store/app/myTasks/taskListStatus'
import { useProjectsTaskListStatus } from 'src/store/app/projects/taskListStatus'
import {
  TaskListCompletedStatusType,
  TaskListSortStatusType,
} from 'src/store/entities/taskListStatus'
import { useTasksContext } from '../TasksProvider'

type Result = {
  taskListStatus: {
    taskListCompletedStatus: TaskListCompletedStatusType
    taskListSortStatus: TaskListSortStatusType
  }
  sortByNone: () => void
  sortByAlphabetical: () => void
  sortByLikes: () => void
  sortByDueDate: () => void
  sortByProject?: () => void
  setTaskListCompletedStatus: (status: TaskListCompletedStatusType) => void
}

export const useTasksTaskListStatus = (): Result => {
  const { isMyTasksPage } = useTasksContext()
  const useMyTasksTaskListStatusResult = useMyTasksTaskListStatus()
  const useProjectsTaskListStatusResult = useProjectsTaskListStatus()

  if (isMyTasksPage) {
    return {
      ...useMyTasksTaskListStatusResult,
    }
  }

  return {
    ...useProjectsTaskListStatusResult,
  }
}
