import {
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  DefaultValue,
  atom,
  useRecoilValue,
} from 'recoil'
import { Subtask } from './type'
import { uniqBy } from 'src/shared/utils'
import { useCallback } from 'react'

export const subtaskIdsState = atom<string[]>({
  key: 'subtaskIdsState',
  default: [],
})
export const subtasksState = atom<Subtask[]>({
  key: 'subtasksState',
  default: [],
})

const subtaskState = atomFamily<Subtask, string>({
  key: 'subtaskState',
  default: {
    id: '',
    taskId: '',
    projectId: '',
    name: '',
    dueDate: '',
    dueTime: '',
    isDone: false,
  },
})

export const subtaskSelector = selectorFamily<Subtask, string>({
  key: 'subtaskSelector',
  get: (subtaskId) => ({ get }) => get(subtaskState(subtaskId)),
  set: (subtaskId) => ({ get, set, reset }, newVal) => {
    if (newVal instanceof DefaultValue) {
      reset(subtaskState(subtaskId))
      return
    }

    set(subtaskState(subtaskId), newVal)
    set(subtasksState, (prev) =>
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

    if (get(subtaskIdsState).find((subtaskId) => subtaskId === newVal.id))
      return
    set(subtaskIdsState, (prev) => [...prev, newVal.id])
  },
})

export const useSubtasks = () => {
  const subtaskIds = useRecoilValue(subtaskIdsState)
  const subtasks = useRecoilValue(subtasksState)

  const setSubtasks = useRecoilCallback(
    ({ set }) => (subtasks: Subtask[]) => {
      subtasks.forEach((p) => {
        set(subtaskSelector(p.id), p)
      })
    },
    [],
  )
  const subtasksByTaskId = useCallback(
    (taskId: string) => {
      return subtasks.filter((s) => s.taskId === taskId)
    },
    [subtasks],
  )

  return {
    subtaskIds,
    subtasks,
    setSubtasks,
    subtasksByTaskId,
  }
}

export const useSubtask = (subtaskId: string) => {
  const subtask = useRecoilValue(subtaskSelector(subtaskId))

  const upsertSubtask = useRecoilCallback(
    ({ set }) => (subtask: Subtask) => {
      set(subtaskSelector(subtask.id), subtask)
    },
    [],
  )

  return {
    subtask,
    upsertSubtask,
  }
}
