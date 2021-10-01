import { selectorFamily } from 'recoil'
import { taskColumnByTypeState } from 'src/store/entities/taskColumns'
import { TaskColumnType } from 'src/store/entities/taskColumns/types'
import { createState } from 'src/store/util'
import { ProjectsTaskColumn } from './type'

const key = (str: string) => `src/store/entities/projectsTaskColumns/${str}`

export const initialState = (): ProjectsTaskColumn => ({
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
  ProjectsTaskColumn[],
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
  ProjectsTaskColumn,
  { projectId: string; type: TaskColumnType }
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
