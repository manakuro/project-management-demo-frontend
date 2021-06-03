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
import { useCallback, useMemo } from 'react'
import { uuid } from 'src/shared/uuid'

export const subtaskIdsState = atom<string[]>({
  key: 'subtaskIdsState',
  default: [],
})
export const subtaskIdsGroupByTaskState = atom<Record<string, string[]>>({
  key: 'subtaskIdsGroupByTaskState',
  default: {},
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
  get:
    (subtaskId) =>
    ({ get }) =>
      get(subtaskState(subtaskId)),
  set:
    (subtaskId) =>
    ({ get, set, reset }, newVal) => {
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
      set(subtaskIdsGroupByTaskState, (prev) => {
        return {
          ...prev,
          [newVal.taskId]: [...(prev[newVal.taskId] || []), newVal.id],
        }
      })
    },
})

export const useSubtasksByTask = (taskId: string) => {
  const subtaskIdsGroupByTask = useRecoilValue(subtaskIdsGroupByTaskState)
  const { upsertSubtask } = useSubtask()

  const subtaskIds = useMemo(() => {
    return subtaskIdsGroupByTask[taskId] || []
  }, [subtaskIdsGroupByTask, taskId])

  const addSubtask = useCallback(() => {
    upsertSubtask({
      ...defaultStateValue(),
      id: uuid(),
      taskId,
    })
  }, [taskId, upsertSubtask])

  return {
    subtaskIds,
    addSubtask,
  }
}

export const useSubtasks = () => {
  const subtaskIds = useRecoilValue(subtaskIdsState)
  const subtasks = useRecoilValue(subtasksState)

  const setSubtasks = useRecoilCallback(
    ({ set }) =>
      (subtasks: Subtask[]) => {
        subtasks.forEach((p) => {
          set(subtaskSelector(p.id), p)
        })
      },
    [],
  )

  return {
    subtaskIds,
    subtasks,
    setSubtasks,
  }
}

export const useSubtask = (subtaskId?: string) => {
  const subtask = useRecoilValue(subtaskSelector(subtaskId || ''))

  const upsertSubtask = useRecoilCallback(
    ({ set }) =>
      (subtask: Subtask) => {
        set(subtaskSelector(subtask.id), subtask)
      },
    [],
  )

  const setSubtask = useRecoilCallback(
    ({ snapshot }) =>
      async (val: DeepPartial<Subtask>) => {
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
