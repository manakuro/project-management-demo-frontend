import { selectorFamily } from 'recoil'
import { teammatesTaskColumnsByTeammateId } from 'src/store/entities/teammatesTaskColumns'

const key = (str: string) => `src/store/app/myTasks/taskColumns/${str}`

export const taskColumnIdsSelector = selectorFamily<string[], string>({
  key: key('myTaskTaskColumnIdsSelector'),
  get:
    (teammateId: string) =>
    ({ get }) => {
      const taskColumns = get(teammatesTaskColumnsByTeammateId(teammateId))

      return taskColumns
        .filter((t) => !t.disabled)
        .sort((a, b) => (a.order > b.order ? 1 : -1))
        .map((t) => t.id)
    },
})

export const taskColumnIdsCustomizableSelector = selectorFamily<
  string[],
  string
>({
  key: key('myTaskTaskColumnIdsCustomizableSelector'),
  get:
    (teammateId: string) =>
    ({ get }) => {
      const taskColumns = get(teammatesTaskColumnsByTeammateId(teammateId))
      return [...taskColumns]
        .sort((a, b) => (a.order > b.order ? 1 : -1))
        .map((t) => t.id)
    },
})
