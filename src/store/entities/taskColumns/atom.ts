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

const initialStateValue = (): TaskColumn => ({
  id: '',
  name: '',
  type: 1,
  createdAt: '',
  updatedAt: '',
})
const state = atomFamily<TaskColumn, string>({
  key: key('state'),
  default: initialStateValue(),
})

export const taskColumnState = selectorFamily<TaskColumn, string>({
  key: key('taskColumnState'),
  get:
    (taskColumnId) =>
    ({ get }) =>
      get(state(taskColumnId)),
  set:
    (taskColumnId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(state(taskColumnId))
        return
      }

      set(state(taskColumnId), newVal)
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
