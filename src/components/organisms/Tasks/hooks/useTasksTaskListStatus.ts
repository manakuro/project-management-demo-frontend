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
    return {
      taskListStatus: {
        taskListCompletedStatus: getTaskListCompletedStatus(
          useMyTasksTaskListStatusResult,
        ),
        taskListSortStatus: getTaskListSortStatus(
          useMyTasksTaskListStatusResult,
        ),
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

  return {
    taskListStatus: {
      taskListCompletedStatus: getTaskListCompletedStatus(
        useProjectsTaskListStatusResult,
      ),
      taskListSortStatus: getTaskListSortStatus(
        useProjectsTaskListStatusResult,
      ),
    },
    sortByNone: useProjectsTaskListStatusResult.sortByNone,
    sortByAlphabetical: useProjectsTaskListStatusResult.sortByAlphabetical,
    sortByLikes: useProjectsTaskListStatusResult.sortByLikes,
    sortByDueDate: useProjectsTaskListStatusResult.sortByDueDate,
    sortByAssignee: useProjectsTaskListStatusResult.sortByAssignee,
    sortByPriority: useProjectsTaskListStatusResult.sortByPriority,
    setTaskListCompletedStatus:
      useProjectsTaskListStatusResult.setTaskListCompletedStatus,
  }
}

const getTaskListCompletedStatus = <
  T extends {
    taskListStatus: {
      taskListCompletedStatus: {
        statusCode: TaskListCompletedStatusCodeValue | null
      }
    }
  },
>(
  data: T,
) => {
  return (
    data.taskListStatus.taskListCompletedStatus.statusCode ||
    TaskListCompletedStatusCode.Incomplete
  )
}

const getTaskListSortStatus = <
  T extends {
    taskListStatus: {
      taskListSortStatus: {
        statusCode: TaskListSortStatusCodeValue | null
      }
    }
  },
>(
  data: T,
) => {
  return (
    data.taskListStatus.taskListSortStatus.statusCode ||
    TaskListSortStatusCode.None
  )
}
