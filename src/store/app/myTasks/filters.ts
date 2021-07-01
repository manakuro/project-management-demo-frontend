import { GetRecoilValue } from 'recoil'
import { dateFns } from 'src/shared/dateFns'
import { uniq } from 'src/shared/utils'
import {
  myTaskTaskStatusState,
  TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL,
  TASK_LIST_SORT_STATUS_TYPE_DUE_DATE,
  TASK_LIST_SORT_STATUS_TYPE_LIKES,
  TASK_LIST_STATUS_TYPE_COMPLETED,
  TASK_LIST_STATUS_TYPE_COMPLETED_1_WEEK,
  TASK_LIST_STATUS_TYPE_COMPLETED_2_WEEKS,
  TASK_LIST_STATUS_TYPE_COMPLETED_3_WEEKS,
  TASK_LIST_STATUS_TYPE_COMPLETED_TODAY,
  TASK_LIST_STATUS_TYPE_COMPLETED_YESTERDAY,
  TASK_LIST_STATUS_TYPE_INCOMPLETE,
} from 'src/store/app/myTasks'
import { projectTasksState } from 'src/store/entities/projectTasks'
import { taskLikesByTaskIdSelector } from 'src/store/entities/taskLikes'
import { Task } from 'src/store/entities/tasks'

type Params = {
  get: GetRecoilValue
}

export const sortTasks = (params: Params) => (t: Task[]) => {
  let tasks = sortByDueDate(params)(t)
  tasks = sortByLikes(params)(tasks)
  tasks = sortByAlphabetical(params)(tasks)

  return tasks
}

export const sortByDueDate =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    const taskStatus = get(myTaskTaskStatusState)
    if (taskStatus.sortStatus !== TASK_LIST_SORT_STATUS_TYPE_DUE_DATE)
      return tasks

    return tasks
      .filter((t) => !!t.dueDate)
      .sort((a, b) => (a.dueDate < b.dueDate ? -1 : 1))
  }

export const sortByLikes =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    const taskStatus = get(myTaskTaskStatusState)
    if (taskStatus.sortStatus !== TASK_LIST_SORT_STATUS_TYPE_LIKES) return tasks

    return tasks.sort((a, b) => {
      const taskLikesA = get(taskLikesByTaskIdSelector(a.id))
      const taskLikesB = get(taskLikesByTaskIdSelector(b.id))
      return taskLikesA.length < taskLikesB.length ? 1 : -1
    })
  }

export const sortByAlphabetical =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    const taskStatus = get(myTaskTaskStatusState)
    if (taskStatus.sortStatus !== TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL)
      return tasks

    return tasks.sort((a, b) =>
      a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1,
    )
  }

export const filterByTeammateId = (teammateId: string) => (tasks: Task[]) =>
  tasks.filter((t) => !t.isDeleted && t.assigneeId === teammateId)

export const filterByTaskSectionId =
  (taskSectionId: string) => (tasks: Task[]) =>
    tasks.filter((t) => !t.isDeleted && t.taskSectionId === taskSectionId)

export const filterByProjectTasks =
  ({ get, projectId }: Params & { projectId: string }) =>
  (tasks: Task[]) => {
    const projectTasks = get(projectTasksState)
    const taskIdsWithProject = uniq(
      projectTasks
        .filter((p) => p.projectId === projectId)
        .map((p) => p.taskId),
    )
    return tasks.filter((t) => taskIdsWithProject.includes(t.id))
  }

export const filterByNoProject =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    const projectTasks = get(projectTasksState)
    const taskIdsWithProject = uniq(projectTasks.map((p) => p.taskId))

    return tasks.filter((t) => !taskIdsWithProject.includes(t.id))
  }

export const filterTasks = (params: Params) => (t: Task[]) => {
  let tasks = filterByIncomplete(params)(t)
  tasks = filterByAllCompleted(params)(tasks)
  tasks = filterByCompletedSinceToday(params)(tasks)
  tasks = filterByCompletedSinceYesterday(params)(tasks)
  tasks = filterByCompletedSince1Week(params)(tasks)
  tasks = filterByCompletedSince2Weeks(params)(tasks)
  tasks = filterByCompletedSince3Weeks(params)(tasks)
  return tasks
}

export const filterByIncomplete =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    const taskStatus = get(myTaskTaskStatusState)
    if (taskStatus.taskListStatus !== TASK_LIST_STATUS_TYPE_INCOMPLETE)
      return tasks
    return tasks.filter((t) => !t.isDone)
  }

export const filterByAllCompleted =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    const taskStatus = get(myTaskTaskStatusState)
    if (taskStatus.taskListStatus !== TASK_LIST_STATUS_TYPE_COMPLETED)
      return tasks
    return tasks.filter((t) => t.isDone)
  }

const getDuration = (date: string) => {
  return dateFns.intervalToDuration({
    start: new Date(date),
    end: new Date(),
  })
}
export const filterByCompletedSinceToday =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    const taskStatus = get(myTaskTaskStatusState)
    if (taskStatus.taskListStatus !== TASK_LIST_STATUS_TYPE_COMPLETED_TODAY)
      return tasks

    return tasks.filter((t) => {
      if (!t.doneAt) return false

      const duration = getDuration(t.doneAt)
      return t.isDone && duration.days === 0
    })
  }

export const filterByCompletedSinceYesterday =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    const taskStatus = get(myTaskTaskStatusState)
    if (taskStatus.taskListStatus !== TASK_LIST_STATUS_TYPE_COMPLETED_YESTERDAY)
      return tasks

    return tasks.filter((t) => {
      if (!t.doneAt) return false

      const duration = getDuration(t.doneAt)
      return t.isDone && Number(duration.days) <= 1
    })
  }

export const filterByCompletedSince1Week =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    const taskStatus = get(myTaskTaskStatusState)
    if (taskStatus.taskListStatus !== TASK_LIST_STATUS_TYPE_COMPLETED_1_WEEK)
      return tasks

    return tasks.filter((t) => {
      if (!t.doneAt) return false

      const duration = getDuration(t.doneAt)
      return t.isDone && Number(duration.days) <= 7
    })
  }

export const filterByCompletedSince2Weeks =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    const taskStatus = get(myTaskTaskStatusState)
    if (taskStatus.taskListStatus !== TASK_LIST_STATUS_TYPE_COMPLETED_2_WEEKS)
      return tasks

    return tasks.filter((t) => {
      if (!t.doneAt) return false

      const duration = getDuration(t.doneAt)
      return t.isDone && Number(duration.days) <= 14
    })
  }

export const filterByCompletedSince3Weeks =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    const taskStatus = get(myTaskTaskStatusState)
    if (taskStatus.taskListStatus !== TASK_LIST_STATUS_TYPE_COMPLETED_3_WEEKS)
      return tasks

    return tasks.filter((t) => {
      if (!t.doneAt) return false

      const duration = getDuration(t.doneAt)
      return t.isDone && Number(duration.days) <= 21
    })
  }
