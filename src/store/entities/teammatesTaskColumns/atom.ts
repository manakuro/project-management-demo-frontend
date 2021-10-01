import { selectorFamily } from 'recoil'
import { taskColumnByTypeState } from 'src/store/entities/taskColumns'
import { TaskColumnType } from 'src/store/entities/taskColumns/types'
import { createState } from 'src/store/util'
import { TeammatesTaskColumn } from './type'

const key = (str: string) => `src/store/entities/teammatesTaskColumns/${str}`

export const initialState = (): TeammatesTaskColumn => ({
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
        ) ?? initialState()
      )
    },
})
