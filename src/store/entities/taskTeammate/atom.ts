import { selectorFamily } from 'recoil'
import { createState } from 'src/store/util'
import { TaskCollaborator } from './type'

const key = (str: string) => `src/store/entities/taskTeammate/${str}`

const initialState = (): TaskCollaborator => ({
  id: '',
  taskId: '',
  teammateId: '',
  createdAt: '',
  updatedAt: '',
})
export const { state: taskTeammateState, listState: taskTeammatesState } =
  createState({ key, initialState })

export const teammateIdsByTaskIdState = selectorFamily<string[], string>({
  key: key('teammateIdsByTaskIdState'),
  get:
    (taskId) =>
    ({ get }) => {
      const teammates = get(taskTeammatesState)
      return teammates
        .filter((t) => t.taskId === taskId)
        .map((p) => p.teammateId)
    },
})
