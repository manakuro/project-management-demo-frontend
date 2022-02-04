import { selectorFamily } from 'recoil'
import { projectsTaskColumnsByProjectIdState } from 'src/store/entities/projectsTaskColumn'

const key = (str: string) => `src/store/app/projects/taskColumns/${str}`

export const projectsTaskColumnIdsState = selectorFamily<string[], string>({
  key: key('projectsTaskColumnIdsState'),
  get:
    (projectId: string) =>
    ({ get }) => {
      const taskColumns = get(projectsTaskColumnsByProjectIdState(projectId))

      return taskColumns
        .filter((t) => !t.disabled)
        .sort((a, b) => (a.order > b.order ? 1 : -1))
        .map((t) => t.id)
    },
})

export const projectsTaskColumnIdsCustomizableState = selectorFamily<
  string[],
  string
>({
  key: key('projectsTaskColumnIdsCustomizableState'),
  get:
    (projectId: string) =>
    ({ get }) => {
      const taskColumns = get(projectsTaskColumnsByProjectIdState(projectId))
      return [...taskColumns]
        .sort((a, b) => (a.order > b.order ? 1 : -1))
        .map((t) => t.id)
    },
})
