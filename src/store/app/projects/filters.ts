import { GetRecoilValue } from 'recoil'
import { dateFns } from 'src/shared/dateFns'
import { taskLikesByTaskIdSelector } from 'src/store/entities/taskLikes'
import { Task } from 'src/store/entities/tasks'
import {
  isProjectsSortStatus,
  isProjectsTaskListStatus,
} from './taskListStatus'

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
    if (!get(isProjectsSortStatus('dueDate'))) return tasks

    return tasks.sort((a, b) => {
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1

      return a.dueDate < b.dueDate ? -1 : 1
    })
  }

export const sortByLikes =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    if (!get(isProjectsSortStatus('likes'))) return tasks

    return tasks.sort((a, b) => {
      const taskLikesA = get(taskLikesByTaskIdSelector(a.id))
      const taskLikesB = get(taskLikesByTaskIdSelector(b.id))
      return taskLikesA.length < taskLikesB.length ? 1 : -1
    })
  }

export const sortByAlphabetical =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    if (!get(isProjectsSortStatus('alphabetical'))) return tasks

    return tasks.sort((a, b) =>
      a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1,
    )
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
    if (!get(isProjectsTaskListStatus('incomplete'))) return tasks
    return tasks.filter((t) => !t.isDone)
  }

export const filterByAllCompleted =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    if (!get(isProjectsTaskListStatus('completed'))) return tasks
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
    if (!get(isProjectsTaskListStatus('completedToday'))) return tasks

    return tasks.filter((t) => {
      if (!t.doneAt) return false

      const duration = getDuration(t.doneAt)
      return t.isDone && duration.days === 0
    })
  }

export const filterByCompletedSinceYesterday =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    if (!get(isProjectsTaskListStatus('completedYesterday'))) return tasks

    return tasks.filter((t) => {
      if (!t.doneAt) return false

      const duration = getDuration(t.doneAt)
      return t.isDone && Number(duration.days) <= 1
    })
  }

export const filterByCompletedSince1Week =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    if (!get(isProjectsTaskListStatus('completed1Week'))) return tasks

    return tasks.filter((t) => {
      if (!t.doneAt) return false

      const duration = getDuration(t.doneAt)
      return t.isDone && Number(duration.days) <= 7
    })
  }

export const filterByCompletedSince2Weeks =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    if (!get(isProjectsTaskListStatus('completed2Weeks'))) return tasks

    return tasks.filter((t) => {
      if (!t.doneAt) return false

      const duration = getDuration(t.doneAt)
      return t.isDone && Number(duration.days) <= 14
    })
  }

export const filterByCompletedSince3Weeks =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    if (!get(isProjectsTaskListStatus('completed3Weeks'))) return tasks

    return tasks.filter((t) => {
      if (!t.doneAt) return false

      const duration = getDuration(t.doneAt)
      return t.isDone && Number(duration.days) <= 21
    })
  }
