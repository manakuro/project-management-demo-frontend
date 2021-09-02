import { atomFamily, selectorFamily, DefaultValue, atom } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { TaskTeammate } from './type'

const key = (str: string) => `src/store/entities/taskTeammates/${str}`

export const taskTeammateIdsState = atom<string[]>({
  key: key('taskTeammateIdsState'),
  default: [],
})
export const taskTeammatesState = atom<TaskTeammate[]>({
  key: key('taskTeammatesState'),
  default: [],
})

const taskTeammateState = atomFamily<TaskTeammate, string>({
  key: key('taskTeammateState'),
  default: {
    id: '',
    taskId: '',
    teammateId: '',
    createdAt: '',
    updatedAt: '',
  },
})

export const taskTeammateSelector = selectorFamily<TaskTeammate, string>({
  key: key('taskTeammateSelector'),
  get:
    (taskTeammateId) =>
    ({ get }) =>
      get(taskTeammateState(taskTeammateId)),
  set:
    (taskTeammateId) =>
    ({ get, set, reset }, newVal) => {
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

      if (
        get(taskTeammateIdsState).find(
          (taskTeammateId) => taskTeammateId === newVal.id,
        )
      )
        return
      set(taskTeammateIdsState, (prev) => [...prev, newVal.id])
    },
})
