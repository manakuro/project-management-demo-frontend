import { useMyTasksTaskListStatus } from 'src/store/app/myTasks/taskListStatus'
import { useProjectsTaskListStatus } from 'src/store/app/projects/taskListStatus'
import {
  TaskListCompletedStatusCode,
  TaskListCompletedStatusCodeValue,
} from 'src/store/entities/taskListCompletedStatus'
import {
  TaskListSortStatusCodeValue,
  TaskListSortStatusCode,
} from 'src/store/entities/taskListSortStatus'
import { useTasksContext } from '../TasksProvider'

type Result = {
  taskListStatus: {
    taskListCompletedStatus: TaskListCompletedStatusCodeValue
    taskListSortStatus: TaskListSortStatusCodeValue
  }
  sortByNone: () => void
  sortByAlphabetical: () => void
  sortByLikes: () => void
  sortByDueDate: () => void
  sortByProject?: () => void
  sortByAssignee?: () => void
  sortByPriority?: () => void
  setTaskListCompletedStatus: (status: TaskListCompletedStatusCodeValue) => void
}

export const useTasksTaskListStatus = (): Result => {
  const { isMyTasksPage } = useTasksContext()
  const useMyTasksTaskListStatusResult = useMyTasksTaskListStatus()
  const useProjectsTaskListStatusResult = useProjectsTaskListStatus()

  if (isMyTasksPage) {
    const taskListCompletedStatus =
      useMyTasksTaskListStatusResult.taskListStatus.taskListCompletedStatus
        .statusCode || TaskListCompletedStatusCode.Incomplete

    const taskListSortStatus =
      useMyTasksTaskListStatusResult.taskListStatus.taskListSortStatus
        .statusCode || TaskListSortStatusCode.None

    return {
      taskListStatus: {
        taskListCompletedStatus,
        taskListSortStatus,
      },
      sortByNone: useMyTasksTaskListStatusResult.sortByNone,
      sortByAlphabetical: useMyTasksTaskListStatusResult.sortByAlphabetical,
      sortByLikes: useMyTasksTaskListStatusResult.sortByLikes,
      sortByDueDate: useMyTasksTaskListStatusResult.sortByDueDate,
      sortByProject: useMyTasksTaskListStatusResult.sortByProject,
      setTaskListCompletedStatus:
        useMyTasksTaskListStatusResult.setTaskListCompletedStatus,
    }
  }

  return { ...useProjectsTaskListStatusResult }
}
