import { selectorFamily } from 'recoil'
import { isMyTaskSortStatus } from 'src/store/app/myTasks/taskListStatus'
import { isTabStatusForMyTasks } from 'src/store/entities/tabStatusForMyTasks'
import { TaskSection } from 'src/store/entities/taskSections'
import { tasksByTaskSectionIdSelector } from 'src/store/entities/tasks'
import { taskSectionsByTeammateIdSelector } from 'src/store/entities/teammatesTaskSections'

const key = (str: string) => `src/store/app/myTasks/taskSections/${str}`

export const taskSectionIdsSelector = selectorFamily<string[], string>({
  key: key('taskSectionIdsSelector'),
  get:
    (teammateId) =>
    ({ get }) => {
      const taskSections = get(taskSectionsByTeammateIdSelector(teammateId))

      switch (true) {
        case get(isTabStatusForMyTasks('list')): {
          switch (true) {
            case get(isMyTaskSortStatus('dueDate')): {
              const hasTaskWithNoDueDate = !!taskSections.filter(
                (taskSection) => {
                  const tasks = get(
                    tasksByTaskSectionIdSelector(taskSection.id),
                  )
                  return tasks.some((t) => !t.dueDate)
                },
              ).length
              if (!hasTaskWithNoDueDate) return []

              return taskSections.map((t) => t.id)
            }
            case get(isMyTaskSortStatus('likes')):
            case get(isMyTaskSortStatus('alphabetical')): {
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

export const taskSectionsSelector = selectorFamily<TaskSection[], string>({
  key: key('taskSectionsSelector'),
  get:
    (teammateId) =>
    ({ get }) => {
      const taskSections = get(taskSectionsByTeammateIdSelector(teammateId))
      return [...taskSections]
    },
})
