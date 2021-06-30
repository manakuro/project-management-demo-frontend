import { useCallback, useMemo } from 'react'
import {
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  DefaultValue,
  atom,
  useRecoilValue,
  useRecoilState,
} from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { uuid } from 'src/shared/uuid'
import { TaskLike } from './type'

export const taskLikeIdsState = atom<string[]>({
  key: 'taskLikeIdsState',
  default: [],
})

export const taskLikesState = atom<TaskLike[]>({
  key: 'taskLikesState',
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
  key: 'taskLikeState',
  default: defaultTaskLikeStateValue(),
})
export const taskLikesByTaskIdSelector = selectorFamily<TaskLike[], string>({
  key: 'taskLikesByTaskIdSelector',
  get:
    (taskId: string) =>
    ({ get }) => {
      const taskLikes = get(taskLikesState)
      return taskLikes.filter((t) => t.taskId === taskId)
    },
})

export const taskLikeSelector = selectorFamily<TaskLike, string>({
  key: 'taskLikeSelector',
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

export const useTaskLikesByTaskId = (taskId: string) => {
  const { upsertTaskLike } = useTaskLike()
  const [taskLikesAll, setTaskLikesAll] = useRecoilState(taskLikesState)

  const addTaskLike = useCallback(
    (teammateId: string) => {
      const id = uuid()
      upsertTaskLike({
        ...defaultTaskLikeStateValue(),
        id,
        taskId,
        teammateId,
      })

      return id
    },
    [taskId, upsertTaskLike],
  )

  const deleteTaskLike = useRecoilCallback(
    () => (teammateId: string) => {
      const index = taskLikesAll.findIndex(
        (f) => f.teammateId === teammateId && f.taskId === taskId,
      )
      const newValue = [
        ...taskLikesAll.slice(0, index),
        ...taskLikesAll.slice(index + 1),
      ]
      setTaskLikesAll(newValue)
    },
    [taskId, taskLikesAll, setTaskLikesAll],
  )

  const taskLikes = useMemo(
    () => taskLikesAll.filter((f) => f.taskId === taskId),
    [taskLikesAll, taskId],
  )
  const teammateIds = useMemo(
    () => taskLikes.map((f) => f.teammateId),
    [taskLikes],
  )

  return {
    addTaskLike,
    deleteTaskLike,
    taskLikes,
    teammateIds,
  }
}

export const useTaskLikes = () => {
  const taskLikeIds = useRecoilValue(taskLikeIdsState)
  const taskLikes = useRecoilValue(taskLikesState)

  const setTaskLikes = useRecoilCallback(
    ({ set }) =>
      (data: TaskLike[]) => {
        data.forEach((d) => {
          set(taskLikeSelector(d.id), d)
        })
      },
    [],
  )
  const isTaskLiked = useCallback(
    ({ taskId, teammateId }: { taskId: string; teammateId: string }) => {
      return taskLikes.some(
        (f) => f.taskId === taskId && f.teammateId === teammateId,
      )
    },
    [taskLikes],
  )

  return {
    taskLikeIds,
    taskLikes,
    setTaskLikes,
    isTaskLiked,
  }
}

export const useTaskLike = (taskLikeId?: string) => {
  const taskLike = useRecoilValue(taskLikeSelector(taskLikeId || ''))

  const upsertTaskLike = useRecoilCallback(
    ({ set }) =>
      (taskLike: TaskLike) => {
        set(taskLikeSelector(taskLike.id), taskLike)
      },
    [],
  )

  const setTaskLike = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<TaskLike>) => {
        const prev = await snapshot.getPromise(taskLikeSelector(taskLike.id))
        upsertTaskLike({
          ...prev,
          ...val,
        })
      },
    [upsertTaskLike, taskLike.id],
  )

  return {
    taskLike,
    upsertTaskLike,
    setTaskLike,
  }
}
