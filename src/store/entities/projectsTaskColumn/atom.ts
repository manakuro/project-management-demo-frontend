import { selectorFamily } from 'recoil'
import { taskColumnByTypeState } from 'src/store/entities/taskColumns'
import { TaskColumnTypeValue } from 'src/store/entities/taskColumns'
import { createState } from 'src/store/util'
import { ProjectTaskColumn } from './type'

const key = (str: string) => `src/store/entities/projectsTaskColumn/${str}`

export const initialState = (): ProjectTaskColumn => ({
  id: '',
  taskColumnId: '',
  projectId: '',
  width: '',
  disabled: false,
  customizable: false,
  order: 0,
  createdAt: '',
  updatedAt: '',
})

export const {
  state: projectsTaskColumnState,
  listState: projectsTaskColumnsState,
  idsState: projectsTaskColumnIdsState,
} = createState({ key, initialState })

export const projectsTaskColumnsByProjectIdState = selectorFamily<
  ProjectTaskColumn[],
  string
>({
  key: key('projectsTaskColumnsByProjectIdState'),
  get:
    (projectId: string) =>
    ({ get }) => {
      const taskColumns = get(projectsTaskColumnsState)
      return taskColumns.filter((t) => t.projectId === projectId)
    },
})

export const projectsTaskColumnByTypeState = selectorFamily<
  ProjectTaskColumn,
  { projectId: string; type: TaskColumnTypeValue }
>({
  key: key('projectsTaskColumnByTypeState'),
  get:
    ({ projectId, type }) =>
    ({ get }) => {
      const taskColumn = get(taskColumnByTypeState(type))
      const taskColumns = get(projectsTaskColumnsState)
      return (
        taskColumns.find(
          (t) => t.projectId === projectId && t.taskColumnId === taskColumn.id,
        ) ?? initialState()
      )
    },
})
