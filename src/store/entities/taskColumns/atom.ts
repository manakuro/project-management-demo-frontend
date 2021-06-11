import {
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  DefaultValue,
  atom,
  useRecoilValue,
} from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { TaskColumn } from './type'

export const taskColumnIdsState = atom<string[]>({
  key: 'taskColumnIdsState',
  default: [],
})
export const taskColumnsState = atom<TaskColumn[]>({
  key: 'taskColumnsState',
  default: [],
})

const defaultStateValue = (): TaskColumn => ({
  id: '',
  fieldId: '',
  projectId: '',
  teammateId: '',
  name: '',
  type: 1,
  width: '',
  createdAt: '',
  updatedAt: '',
})
const taskColumnState = atomFamily<TaskColumn, string>({
  key: 'taskColumnState',
  default: defaultStateValue(),
})

export const taskColumnSelector = selectorFamily<TaskColumn, string>({
  key: 'taskColumnSelector',
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

export const useTaskColumns = () => {
  const taskColumnIds = useRecoilValue(taskColumnIdsState)
  const taskColumns = useRecoilValue(taskColumnsState)

  const setTaskColumn = useRecoilCallback(
    ({ set }) =>
      (taskColumns: TaskColumn[]) => {
        taskColumns.forEach((p) => {
          set(taskColumnSelector(p.id), p)
        })
      },
    [],
  )

  return {
    taskColumnIds,
    taskColumns,
    setTaskColumn,
  }
}

export const useTaskColumn = (taskColumnId?: string) => {
  const taskColumn = useRecoilValue(taskColumnSelector(taskColumnId || ''))

  const upsertTaskColumn = useRecoilCallback(
    ({ set }) =>
      (taskColumn: TaskColumn) => {
        set(taskColumnSelector(taskColumn.id), taskColumn)
      },
    [],
  )

  const setTaskColumn = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<TaskColumn>) => {
        const prev = await snapshot.getPromise(
          taskColumnSelector(taskColumn.id),
        )
        upsertTaskColumn({
          ...prev,
          ...val,
        })
      },
    [upsertTaskColumn, taskColumn.id],
  )

  return {
    taskColumn,
    upsertTaskColumn,
    setTaskColumn,
  }
}