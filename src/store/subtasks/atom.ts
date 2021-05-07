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

const defaultStateValue = (): Subtask => ({
  id: '',
  taskId: '',
  projectId: '',
  name: '',
  dueDate: '',
  dueTime: '',
  isDone: false,
  assigneeId: '',
})
const subtaskState = atomFamily<Subtask, string>({
  key: 'subtaskState',
  default: defaultStateValue(),
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
  // const { upsertSubtask } = useSubtask()

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

  // const addSubtask = useCallback(
  //   (val?: Subtask) => {
  //     upsertSubtask({
  //       ...defaultStateValue(),
  //       id: String(subtasks.length + 1),
  //       ...val,
  //     })
  //   },
  //   [subtasks.length, upsertSubtask],
  // )

  return {
    subtaskIds,
    subtasks,
    setSubtasks,
    subtasksByTaskId,
    // addSubtask,
  }
}

export const useSubtask = (subtaskId?: string) => {
  const subtask = useRecoilValue(subtaskSelector(subtaskId || ''))

  const upsertSubtask = useRecoilCallback(
    ({ set }) => (subtask: Subtask) => {
      set(subtaskSelector(subtask.id), subtask)
    },
    [],
  )

  const setSubtask = useRecoilCallback(
    ({ snapshot }) => async (val: DeepPartial<Subtask>) => {
      const prev = await snapshot.getPromise(subtaskSelector(subtask.id))
      upsertSubtask({
        ...prev,
        ...val,
      })
    },
    [upsertSubtask, subtask.id],
  )

  return {
    subtask,
    upsertSubtask,
    setSubtask,
  }
}
