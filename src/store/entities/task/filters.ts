import { dateFns } from 'src/shared/dateFns'
import { Task } from './type'

export const sortByDueDate = (tasks: Task[]) => {
  return tasks.sort((a, b) => {
    if (!a.dueDate) return 1
    if (!b.dueDate) return -1

    return a.dueDate < b.dueDate ? -1 : 1
  })
}
export const filterByDueDateInFiveDays = (tasks: Task[]) => {
  return tasks.filter((t) => {
    if (!t.dueDate) return false

    return (
      (dateFns.intervalToDuration({
        start: dateFns.endOfDay(new Date()),
        end: dateFns.endOfDay(new Date(t.dueDate)),
      })?.days ?? 0) <= 5
    )
  })
}
export const filterByTeammateId = (teammateId: string) => (tasks: Task[]) =>
  tasks.filter((t) => t.assigneeId === teammateId)

export const filterByDueDate = (dueDate: string) => (tasks: Task[]) =>
  tasks.filter((t) => dateFns.isSameDay(new Date(t.dueDate), new Date(dueDate)))
