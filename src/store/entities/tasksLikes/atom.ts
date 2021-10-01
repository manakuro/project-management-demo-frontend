import { atomFamily, selectorFamily, DefaultValue, atom } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { TaskLike } from './type'

const key = (str: string) => `src/store/entities/taskLikes/${str}`

export const taskLikeIdsState = atom<string[]>({
  key: key('taskLikeIdsState'),
  default: [],
})

export const taskLikesState = atom<TaskLike[]>({
  key: key('taskLikesState'),
  default: [],
})

export const initialTaskLikeStateValue = (): TaskLike => ({
  id: '',
  taskId: '',
  teammateId: '',
  createdAt: '',
  updatedAt: '',
})

export const taskLikesByTaskIdState = selectorFamily<TaskLike[], string>({
  key: key('taskLikesByTaskIdState'),
  get:
    (taskId: string) =>
    ({ get }) => {
      const taskLikes = get(taskLikesState)
      return taskLikes.filter((t) => t.taskId === taskId)
    },
})

const state = atomFamily<TaskLike, string>({
  key: key('state'),
  default: initialTaskLikeStateValue(),
})
export const taskLikeState = selectorFamily<TaskLike, string>({
  key: key('taskLikeState'),
  get:
    (taskLikeId) =>
    ({ get }) =>
      get(state(taskLikeId)),
  set:
    (taskLikeId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(state(taskLikeId))
        return
      }

      set(state(taskLikeId), newVal)
      set(taskLikesState, (prev) =>
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

      if (get(taskLikeIdsState).find((taskLikeId) => taskLikeId === newVal.id))
        return

      set(taskLikeIdsState, (prev) => [...prev, newVal.id])
    },
})
