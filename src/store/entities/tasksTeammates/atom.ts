import { atomFamily, selectorFamily, DefaultValue, atom } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { TasksTeammate } from './type'

const key = (str: string) => `src/store/entities/taskTeammates/${str}`

export const taskTeammatesState = atom<TasksTeammate[]>({
  key: key('taskTeammatesState'),
  default: [],
})

const taskTeammateState = atomFamily<TasksTeammate, string>({
  key: key('taskTeammateState'),
  default: {
    id: '',
    taskId: '',
    teammateId: '',
    createdAt: '',
    updatedAt: '',
  },
})

export const teammateIdsByTaskIdSelector = selectorFamily<string[], string>({
  key: key('teammateIdsByTaskIdSelector'),
  get:
    (taskId) =>
    ({ get }) => {
      const teammates = get(taskTeammatesState)
      return teammates
        .filter((t) => t.taskId === taskId)
        .map((p) => p.teammateId)
    },
})

export const taskTeammateSelector = selectorFamily<TasksTeammate, string>({
  key: key('taskTeammateSelector'),
  get:
    (taskTeammateId) =>
    ({ get }) =>
      get(taskTeammateState(taskTeammateId)),
  set:
    (taskTeammateId) =>
    ({ set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(taskTeammateState(taskTeammateId))
        return
      }

      set(taskTeammateState(taskTeammateId), newVal)
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
