import { selectorFamily } from 'recoil'
import { isTaskListSortStatusState } from 'src/store/app/myTasks/taskListStatus'
import { tasksByTeammateIdState } from 'src/store/entities/teammateTask'
import { isTabStatusState } from 'src/store/entities/teammateTaskTabStatus'
import { taskSectionsByTeammateIdState } from 'src/store/entities/teammatesTaskSections'

const key = (str: string) => `src/store/app/myTasks/taskSections/${str}`

export const taskSectionIdsState = selectorFamily<string[], string>({
  key: key('taskSectionIdsState'),
  get:
    (teammateId) =>
    ({ get }) => {
      const teammateTaskSections = get(
        taskSectionsByTeammateIdState(teammateId),
      )

      switch (true) {
        case get(isTabStatusState('List')): {
          switch (true) {
            case get(isTaskListSortStatusState('dueDate')): {
              let tasks = get(tasksByTeammateIdState)
              tasks = tasks.filter((t) => !t.taskParentId)
              const hasTaskWithNoDueDate = tasks.some((t) => !t.dueDate)
              if (!hasTaskWithNoDueDate) return []

              return teammateTaskSections.map((t) => t.id)
            }
            case get(isTaskListSortStatusState('likes')):
            case get(isTaskListSortStatusState('alphabetical')): {
              return []
            }
            default: {
              return teammateTaskSections.map((t) => t.id)
            }
          }
        }
        default: {
          return teammateTaskSections.map((t) => t.id)
        }
      }
    },
})
