import { selectorFamily } from 'recoil'
import {
  taskColumnByTypeState,
  TaskColumnTypeValue,
} from 'src/store/entities/taskColumns'
import { createState } from 'src/store/util'
import { TeammateTaskColumn } from './type'

const key = (str: string) => `src/store/entities/teammatesTaskColumns/${str}`

export const initialState = (): TeammateTaskColumn => ({
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
export const {
  state: teammatesTaskColumnState,
  listState: teammatesTaskColumnsState,
  idsState: teammatesTaskColumnIdsState,
} = createState({ key, initialState })

export const teammatesTaskColumnsByTeammateIdState = selectorFamily<
  TeammateTaskColumn[],
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
  TeammateTaskColumn,
  { teammateId: string; type: TaskColumnTypeValue }
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
        ) ?? initialState()
      )
    },
})
