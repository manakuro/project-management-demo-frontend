import { selectorFamily } from 'recoil'
import { taskSectionsByProjectIdSelector } from 'src/store/entities/projectsTaskSections'
import { TaskSection } from 'src/store/entities/taskSections'
import { tasksByTaskSectionIdSelector } from 'src/store/entities/tasks'
import { isProjectsSortStatus } from '../taskListStatus'

const key = (str: string) => `src/store/app/projects/taskSections/${str}`

export const projectsTaskSectionIdsSelector = selectorFamily<string[], string>({
  key: key('projectsTaskSectionIdsSelector'),
  get:
    (projectId) =>
    ({ get }) => {
      const taskSections = get(taskSectionsByProjectIdSelector(projectId))

      switch (true) {
        case get(isProjectsSortStatus('dueDate')): {
          const hasTaskWithNoDueDate = !!taskSections.filter((taskSection) => {
            const tasks = get(tasksByTaskSectionIdSelector(taskSection.id))
            return tasks.some((t) => !t.dueDate)
          }).length
          if (!hasTaskWithNoDueDate) return []

          return taskSections.map((t) => t.id)
        }
        case get(isProjectsSortStatus('likes')):
        case get(isProjectsSortStatus('alphabetical')): {
          return []
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
    (projectId) =>
    ({ get }) => {
      const taskSections = get(taskSectionsByProjectIdSelector(projectId))
      return [...taskSections]
    },
})
