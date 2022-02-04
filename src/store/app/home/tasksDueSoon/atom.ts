import { selectorFamily } from 'recoil'
import {
  filterByTeammateId,
  sortByDueDate,
  filterByDueDateInFiveDays,
} from 'src/store/entities/task'
import { tasksState } from 'src/store/entities/task'

const key = (str: string) => `src/store/app/home/tasks/${str}`

export const taskIdsState = selectorFamily<string[], string>({
  key: key('taskIdsState'),
  get:
    (teammateId) =>
    ({ get }) => {
      let tasks = get(tasksState)
      tasks = filterByTeammateId(teammateId)(tasks)
      tasks = filterByDueDateInFiveDays(tasks)
      tasks = sortByDueDate(tasks)

      return tasks.map((t) => t.id)
    },
})
