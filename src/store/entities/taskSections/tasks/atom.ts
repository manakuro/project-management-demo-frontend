import { selectorFamily, useRecoilValue } from 'recoil'
import { Task, tasksState } from 'src/store/entities/tasks'

const filterByTaskSectionId = (taskSectionId: string) => (t: Task) =>
  !t.isDeleted && taskSectionId === t.taskSectionId && !t.taskParentId

export const taskSectionsTaskIdsSelector = selectorFamily<string[], string>({
  key: 'taskSectionsTaskIdsSelector',
  get:
    (taskSectionId) =>
    ({ get }) =>
      get(taskSectionsTasksSelector(taskSectionId)).map((t) => t.id),
})

export const taskSectionsTasksSelector = selectorFamily<Task[], string>({
  key: 'taskSectionsTasksSelector',
  get:
    (taskSectionId) =>
    ({ get }) => {
      const tasks = get(tasksState)
      return tasks.filter(filterByTaskSectionId(taskSectionId))
    },
})

export const useTaskSectionTaskIds = (taskSectionId?: string) => {
  const taskIds = useRecoilValue(
    taskSectionsTaskIdsSelector(taskSectionId || ''),
  )
  return {
    taskIds,
  }
}
export const useTaskSectionTasks = (taskSectionId?: string) => {
  const tasks = useRecoilValue(taskSectionsTasksSelector(taskSectionId || ''))
  return {
    tasks,
  }
}
