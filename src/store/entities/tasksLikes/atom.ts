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

export const defaultTaskLikeStateValue = (): TaskLike => ({
  id: '',
  taskId: '',
  teammateId: '',
  createdAt: '',
  updatedAt: '',
})
const taskLikeState = atomFamily<TaskLike, string>({
  key: key('taskLikeState'),
  default: defaultTaskLikeStateValue(),
})
export const taskLikesByTaskIdSelector = selectorFamily<TaskLike[], string>({
  key: key('taskLikesByTaskIdSelector'),
  get:
    (taskId: string) =>
    ({ get }) => {
      const taskLikes = get(taskLikesState)
      return taskLikes.filter((t) => t.taskId === taskId)
    },
})

export const taskLikeSelector = selectorFamily<TaskLike, string>({
  key: key('taskLikeSelector'),
  get:
    (taskLikeId) =>
    ({ get }) =>
      get(taskLikeState(taskLikeId)),
  set:
    (taskLikeId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(taskLikeState(taskLikeId))
        return
      }

      set(taskLikeState(taskLikeId), newVal)
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
