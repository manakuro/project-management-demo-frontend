import { selector } from 'recoil'
import {
  sortByDueDate,
  filterByDueDateInFiveDays,
} from 'src/store/entities/task'
import { tasksByTeammateIdState } from 'src/store/entities/teammateTask'

const key = (str: string) => `src/store/app/home/tasks/${str}`

export const taskIdsState = selector<string[]>({
  key: key('taskIdsState'),
  get: ({ get }) => {
    let tasks = get(tasksByTeammateIdState)
    tasks = filterByDueDateInFiveDays(tasks)
    tasks = sortByDueDate(tasks)

    return tasks.map((t) => t.id)
  },
})
