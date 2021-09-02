import { selectorFamily } from 'recoil'
import { taskColumnsByTeammateIdSelector } from 'src/store/entities/taskColumns'

const key = (str: string) => `src/store/app/myTasks/taskColumns/${str}`

export const myTaskTaskColumnIdsSelector = selectorFamily<string[], string>({
  key: key('myTaskTaskColumnIdsSelector'),
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

export const myTaskTaskColumnIdsCustomizableSelector = selectorFamily<
  string[],
  string
>({
  key: key('myTaskTaskColumnIdsCustomizableSelector'),
  get:
    (teammateId: string) =>
    ({ get }) => {
      const taskColumns = get(taskColumnsByTeammateIdSelector(teammateId))
      return [...taskColumns]
        .sort((a, b) => (a.order > b.order ? 1 : -1))
        .map((t) => t.id)
    },
})
