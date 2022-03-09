import { selectorFamily } from 'recoil'
import { sortProjectTaskSections } from 'src/store/app/projects/filters'
import { tasksByProjectTaskSectionIdState } from 'src/store/entities/projectTask'
import { projectTaskSectionsByProjectIdState } from 'src/store/entities/projectTaskSection'
import { isTaskListSortStatusState } from '../taskListStatus'

const key = (str: string) => `src/store/app/projects/taskSections/${str}`

export const projectsTaskSectionIdsState = selectorFamily<string[], string>({
  key: key('projectsTaskSectionIdsState'),
  get:
    (projectId) =>
    ({ get }) => {
      let projectTaskSections = get(
        projectTaskSectionsByProjectIdState(projectId),
      )
      projectTaskSections = sortProjectTaskSections({ get })(
        projectTaskSections,
      )

      switch (true) {
        case get(isTaskListSortStatusState('dueDate')): {
          const hasTaskWithNoDueDate = !!projectTaskSections.filter(
            (taskSection) => {
              const tasks = get(
                tasksByProjectTaskSectionIdState(taskSection.id),
              )
              return tasks.some((t) => !t.dueDate)
            },
          ).length
          if (!hasTaskWithNoDueDate) return []

          return projectTaskSections.map((t) => t.id)
        }
        case get(isTaskListSortStatusState('likes')):
        case get(isTaskListSortStatusState('alphabetical')): {
          return []
        }
        default: {
          return projectTaskSections.map((t) => t.id)
        }
      }
    },
})
