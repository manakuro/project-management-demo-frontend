import { selectorFamily } from 'recoil'
import { teammatesTaskColumnsByTeammateIdState } from 'src/store/entities/teammatesTaskColumns'

const key = (str: string) => `src/store/app/myTasks/taskColumns/${str}`

export const taskColumnIdsState = selectorFamily<string[], string>({
  key: key('taskColumnIdsState'),
  get:
    (teammateId: string) =>
    ({ get }) => {
      const taskColumns = get(teammatesTaskColumnsByTeammateIdState(teammateId))

      return taskColumns
        .filter((t) => !t.disabled)
        .sort((a, b) => (a.order > b.order ? 1 : -1))
        .map((t) => t.id)
    },
})

export const taskColumnIdsCustomizableState = selectorFamily<string[], string>({
  key: key('taskColumnIdsCustomizableState'),
  get:
    (teammateId: string) =>
    ({ get }) => {
      const taskColumns = get(teammatesTaskColumnsByTeammateIdState(teammateId))
      return [...taskColumns]
        .sort((a, b) => (a.order > b.order ? 1 : -1))
        .map((t) => t.id)
    },
})
