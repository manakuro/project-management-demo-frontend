import { atomFamily, selectorFamily, DefaultValue, atom } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { taskColumnByTypeState } from 'src/store/entities/taskColumns'
import { TaskColumnType } from 'src/store/entities/taskColumns/types'
import { TeammatesTaskColumn } from './type'

const key = (str: string) => `src/store/entities/teammatesTaskColumns/${str}`

export const teammatesTaskColumnIdsState = atom<string[]>({
  key: key('teammatesTaskColumnIds'),
  default: [],
})

export const teammatesTaskColumnsState = atom<TeammatesTaskColumn[]>({
  key: key('teammatesTaskColumns'),
  default: [],
})

export const teammatesTaskColumnsByTeammateIdState = selectorFamily<
  TeammatesTaskColumn[],
  string
>({
  key: key('teammatesTaskColumnsByTeammateIdState'),
  get:
    (teammateId: string) =>
    ({ get }) => {
      const taskColumns = get(teammatesTaskColumnsState)
      return taskColumns.filter((t) => t.teammateId === teammateId)
    },
})

export const teammatesTaskColumnByTypeState = selectorFamily<
  TeammatesTaskColumn,
  { teammateId: string; type: TaskColumnType }
>({
  key: key('teammatesTaskColumnByTypeState'),
  get:
    ({ teammateId, type }) =>
    ({ get }) => {
      const taskColumn = get(taskColumnByTypeState(type))
      const taskColumns = get(teammatesTaskColumnsState)
      return (
        taskColumns.find(
          (t) =>
            t.teammateId === teammateId && t.taskColumnId === taskColumn.id,
        ) ?? initialTeammatesTaskColumnState()
      )
    },
})

export const initialTeammatesTaskColumnState = (): TeammatesTaskColumn => ({
  id: '',
  taskColumnId: '',
  teammateId: '',
  width: '',
  disabled: false,
  customizable: false,
  order: 0,
  createdAt: '',
  updatedAt: '',
})

const state = atomFamily<TeammatesTaskColumn, string>({
  key: key('state'),
  default: initialTeammatesTaskColumnState(),
})

export const teammatesTaskColumnState = selectorFamily<
  TeammatesTaskColumn,
  string
>({
  key: key('teammatesTaskColumn'),
  get:
    (teammatesTaskColumnId) =>
    ({ get }) =>
      get(state(teammatesTaskColumnId)),
  set:
    (teammatesTaskColumnId) =>
    ({ set, reset, get }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(state(teammatesTaskColumnId))
        return
      }

      set(state(teammatesTaskColumnId), newVal)
      set(teammatesTaskColumnsState, (prev) =>
        uniqBy([...prev, newVal], 'id').map((p) =>
          p.id === newVal.id ? { ...p, ...newVal } : p,
        ),
      )

      if (
        get(teammatesTaskColumnIdsState).find((taskId) => taskId === newVal.id)
      )
        return

      set(teammatesTaskColumnIdsState, (prev) => [...prev, newVal.id])
    },
})
