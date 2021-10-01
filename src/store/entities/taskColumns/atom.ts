import { atomFamily, selectorFamily, DefaultValue, atom } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { TaskColumnType } from 'src/store/entities/taskColumns/types'
import { TaskColumn } from './type'

const key = (str: string) => `src/store/entities/taskColumns/${str}`

export const taskColumnIdsState = atom<string[]>({
  key: key('taskColumnIdsState'),
  default: [],
})
export const taskColumnsState = atom<TaskColumn[]>({
  key: key('taskColumnsState'),
  default: [],
})
export const taskColumnByTypeState = selectorFamily<TaskColumn, TaskColumnType>(
  {
    key: key('taskColumnByTypeState'),
    get:
      (type: TaskColumnType) =>
      ({ get }) => {
        const taskColumns = get(taskColumnsState)
        return taskColumns.find((t) => t.type === type)!
      },
  },
)

const defaultStateValue = (): TaskColumn => ({
  id: '',
  name: '',
  type: 1,
  createdAt: '',
  updatedAt: '',
})
const taskColumnState = atomFamily<TaskColumn, string>({
  key: key('taskColumnState'),
  default: defaultStateValue(),
})

export const taskColumnSelector = selectorFamily<TaskColumn, string>({
  key: key('taskColumnSelector'),
  get:
    (taskColumnId) =>
    ({ get }) =>
      get(taskColumnState(taskColumnId)),
  set:
    (taskColumnId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(taskColumnState(taskColumnId))
        return
      }

      set(taskColumnState(taskColumnId), newVal)
      set(taskColumnsState, (prev) =>
        uniqBy([...prev, newVal], 'id').map((p) => {
          if (p.id === newVal.id) {
            return {
              ...p,
              ...newVal,
            }
          }
          return p
        }),
      )

      if (
        get(taskColumnIdsState).find(
          (taskColumnId) => taskColumnId === newVal.id,
        )
      )
        return

      set(taskColumnIdsState, (prev) => [...prev, newVal.id])
    },
})
