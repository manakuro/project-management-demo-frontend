import { selectorFamily } from 'recoil'
import { isTaskListSortStatusState } from 'src/store/app/myTasks/taskListStatus'
import { isTabStatusForMyTasksState } from 'src/store/entities/tabStatusForMyTasks'
import { TaskSection } from 'src/store/entities/taskSections'
import { tasksByTaskSectionIdState } from 'src/store/entities/tasks'
import { taskSectionsByTeammateIdState } from 'src/store/entities/teammatesTaskSections'

const key = (str: string) => `src/store/app/myTasks/taskSections/${str}`

export const taskSectionIdsState = selectorFamily<string[], string>({
  key: key('taskSectionIdsState'),
  get:
    (teammateId) =>
    ({ get }) => {
      const taskSections = get(taskSectionsByTeammateIdState(teammateId))

      switch (true) {
        case get(isTabStatusForMyTasksState('list')): {
          switch (true) {
            case get(isTaskListSortStatusState('dueDate')): {
              const hasTaskWithNoDueDate = !!taskSections.filter(
                (taskSection) => {
                  const tasks = get(tasksByTaskSectionIdState(taskSection.id))
                  return tasks.some((t) => !t.dueDate)
                },
              ).length
              if (!hasTaskWithNoDueDate) return []

              return taskSections.map((t) => t.id)
            }
            case get(isTaskListSortStatusState('likes')):
            case get(isTaskListSortStatusState('alphabetical')): {
              return []
            }
            default: {
              return taskSections.map((t) => t.id)
            }
          }
        }
        default: {
          return taskSections.map((t) => t.id)
        }
      }
    },
})

export const taskSectionsState = selectorFamily<TaskSection[], string>({
  key: key('taskSectionsState'),
  get:
    (teammateId) =>
    ({ get }) => {
      const taskSections = get(taskSectionsByTeammateIdState(teammateId))
      return [...taskSections]
    },
})
