import { selectorFamily } from 'recoil'
import { projectsTaskColumnsByProjectId } from 'src/store/entities/projectsTaskColumns'

const key = (str: string) => `src/store/app/projects/taskColumns/${str}`

export const projectsTaskColumnIdsSelector = selectorFamily<string[], string>({
  key: key('projectsTaskColumnIdsSelector'),
  get:
    (projectId: string) =>
    ({ get }) => {
      const taskColumns = get(projectsTaskColumnsByProjectId(projectId))

      return taskColumns
        .filter((t) => !t.disabled)
        .sort((a, b) => (a.order > b.order ? 1 : -1))
        .map((t) => t.id)
    },
})

export const projectsTaskColumnIdsCustomizableSelector = selectorFamily<
  string[],
  string
>({
  key: key('projectsTaskColumnIdsCustomizableSelector'),
  get:
    (projectId: string) =>
    ({ get }) => {
      const taskColumns = get(projectsTaskColumnsByProjectId(projectId))
      return [...taskColumns]
        .sort((a, b) => (a.order > b.order ? 1 : -1))
        .map((t) => t.id)
    },
})
