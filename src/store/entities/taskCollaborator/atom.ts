import { selectorFamily } from 'recoil'
import { createState } from 'src/store/util'
import { TaskCollaborator } from './type'

const key = (str: string) => `src/store/entities/taskCollaborator/${str}`

export const initialState = (): TaskCollaborator => ({
  id: '',
  taskId: '',
  teammateId: '',
  createdAt: '',
  updatedAt: '',
})
export const {
  state: taskCollaboratorState,
  listState: taskCollaboratorsState,
} = createState({ key, initialState })

export const teammateIdsByTaskIdState = selectorFamily<string[], string>({
  key: key('teammateIdsByTaskIdState'),
  get:
    (taskId) =>
    ({ get }) => {
      const taskCollaborators = get(taskCollaboratorsState)
      return taskCollaborators
        .filter((t) => t.taskId === taskId)
        .map((p) => p.teammateId)
    },
})

export const taskCollaboratorByTaskIdAndTeammateId = selectorFamily<
  TaskCollaborator,
  { taskId: string; teammateId: string }
>({
  key: key('taskCollaboratorByTaskIdAndTeammateId'),
  get:
    ({ taskId, teammateId }) =>
    ({ get }) => {
      const taskCollaborators = get(taskCollaboratorsState)
      return (
        taskCollaborators.find(
          (t) => t.taskId === taskId && t.teammateId === teammateId,
        ) || initialState()
      )
    },
})
