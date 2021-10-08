import { selectorFamily } from 'recoil'
import { taskSectionsByProjectIdState } from 'src/store/entities/projectsTaskSections'
import { TaskSection } from 'src/store/entities/taskSections'
import { tasksByTaskSectionIdState } from 'src/store/entities/tasks'
import { isTaskListSortStatusState } from '../taskListStatus'

const key = (str: string) => `src/store/app/projects/taskSections/${str}`

export const projectsTaskSectionIdsState = selectorFamily<string[], string>({
  key: key('projectsTaskSectionIdsState'),
  get:
    (projectId) =>
    ({ get }) => {
      const taskSections = get(taskSectionsByProjectIdState(projectId))

      switch (true) {
        case get(isTaskListSortStatusState('dueDate')): {
          const hasTaskWithNoDueDate = !!taskSections.filter((taskSection) => {
            const tasks = get(tasksByTaskSectionIdState(taskSection.id))
            return tasks.some((t) => !t.dueDate)
          }).length
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
    },
})

export const taskSectionsState = selectorFamily<TaskSection[], string>({
  key: key('taskSectionsState'),
  get:
    (projectId) =>
    ({ get }) => {
      const taskSections = get(taskSectionsByProjectIdState(projectId))
      return [...taskSections]
    },
})
