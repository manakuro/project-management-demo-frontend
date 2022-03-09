import { selectorFamily } from 'recoil'
import { sortTeammateTaskSections } from 'src/store/app/myTasks/filters'
import { isTaskListSortStatusState } from 'src/store/app/myTasks/taskListStatus'
import { tasksByTeammateIdState } from 'src/store/entities/teammateTask'
import { isTabStatusState } from 'src/store/entities/teammateTaskTabStatus'
import { taskSectionsByTeammateIdState } from 'src/store/entities/teammatesTaskSection'

const key = (str: string) => `src/store/app/myTasks/taskSections/${str}`

export const taskSectionIdsState = selectorFamily<string[], string>({
  key: key('taskSectionIdsState'),
  get:
    (teammateId) =>
    ({ get }) => {
      let teammateTaskSections = get(taskSectionsByTeammateIdState(teammateId))
      teammateTaskSections = sortTeammateTaskSections({ get })(
        teammateTaskSections,
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
