import { selectorFamily } from 'recoil'
import { taskColumnsByTeammateIdSelector } from 'src/store/entities/taskColumns'

const key = (str: string) => `src/store/app/projects/taskColumns/${str}`

export const projectsTaskColumnIdsSelector = selectorFamily<string[], string>({
  key: key('projectsTaskColumnIdsSelector'),
  get:
    (teammateId: string) =>
    ({ get }) => {
      const taskColumns = get(taskColumnsByTeammateIdSelector(teammateId))

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
    (teammateId: string) =>
    ({ get }) => {
      const taskColumns = get(taskColumnsByTeammateIdSelector(teammateId))
      return [...taskColumns]
        .sort((a, b) => (a.order > b.order ? 1 : -1))
        .map((t) => t.id)
    },
})
