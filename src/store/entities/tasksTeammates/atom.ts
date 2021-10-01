import { atomFamily, selectorFamily, DefaultValue, atom } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { TasksTeammate } from './type'

const key = (str: string) => `src/store/entities/taskTeammates/${str}`

export const taskTeammatesState = atom<TasksTeammate[]>({
  key: key('taskTeammatesState'),
  default: [],
})

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

const state = atomFamily<TasksTeammate, string>({
  key: key('state'),
  default: {
    id: '',
    taskId: '',
    teammateId: '',
    createdAt: '',
    updatedAt: '',
  },
})
export const taskTeammateState = selectorFamily<TasksTeammate, string>({
  key: key('taskTeammateState'),
  get:
    (taskTeammateId) =>
    ({ get }) =>
      get(state(taskTeammateId)),
  set:
    (taskTeammateId) =>
    ({ set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(state(taskTeammateId))
        return
      }

      set(state(taskTeammateId), newVal)
      set(taskTeammatesState, (prev) =>
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
    },
})
