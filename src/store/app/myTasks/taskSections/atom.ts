import { selectorFamily } from 'recoil'
import { isMyTaskSortStatus } from 'src/store/app/myTasks'
import { isTabStatusForMyTasks } from 'src/store/entities/tabStatusForMyTasks'
import { TaskSection, taskSectionsState } from 'src/store/entities/taskSections'
import { tasksByTaskSectionIdSelector } from 'src/store/entities/tasks'

const key = (str: string) => `src/store/app/myTasks/taskSections/${str}`

const filter = (teammateId: string) => (t: TaskSection) =>
  !t.isDeleted && t.teammateId === teammateId

export const myTasksTaskSectionIdsSelector = selectorFamily<string[], string>({
  key: key('myTasksTaskSectionIdsSelector'),
  get:
    (teammateId) =>
    ({ get }) => {
      const taskSections = get(taskSectionsState)

      switch (true) {
        case get(isTabStatusForMyTasks('list')): {
          switch (true) {
            case get(isMyTaskSortStatus('dueDate')): {
              const hasTaskWithNoDueDate = !!taskSections
                .filter(filter(teammateId))
                .filter((taskSection) => {
                  const tasks = get(
                    tasksByTaskSectionIdSelector(taskSection.id),
                  )
                  return tasks.some((t) => !t.dueDate)
                }).length
              if (!hasTaskWithNoDueDate) return []

              return taskSections.filter(filter(teammateId)).map((t) => t.id)
            }
            case get(isMyTaskSortStatus('likes')):
            case get(isMyTaskSortStatus('alphabetical')): {
              return []
            }
            default: {
              return taskSections.filter(filter(teammateId)).map((t) => t.id)
            }
          }
        }
        default: {
          return taskSections.filter(filter(teammateId)).map((t) => t.id)
        }
      }
    },
})

export const taskSectionsSelector = selectorFamily<TaskSection[], string>({
  key: key('taskSectionsSelector'),
  get:
    (teammateId) =>
    ({ get }) => {
      const taskSections = get(taskSectionsState)
      return taskSections.filter(filter(teammateId))
    },
})
