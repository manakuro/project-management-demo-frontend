import {
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  DefaultValue,
  atom,
  useRecoilValue,
} from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { TaskTeammate, TaskTeammateResponse } from './type'

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

export const useTaskTeammates = () => {
  const taskTeammates = useRecoilValue(taskTeammatesState)

  const setTaskTeammates = useRecoilCallback(
    ({ set }) =>
      (data: TaskTeammateResponse[]) => {
        data.forEach((p) => {
          set(taskTeammateSelector(p.id), p)
        })
      },
    [],
  )

  return {
    taskTeammates,
    setTaskTeammates,
  }
}

export const useTaskTeammate = (taskTeammateId: string) => {
  const taskTeammate = useRecoilValue(taskTeammateSelector(taskTeammateId))

  const upsert = useRecoilCallback(
    ({ set }) =>
      (taskTeammate: TaskTeammate) => {
        set(taskTeammateSelector(taskTeammate.id), taskTeammate)
      },
    [],
  )

  const setTaskTeammate = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<TaskTeammate>) => {
        const prev = await snapshot.getPromise(
          taskTeammateSelector(taskTeammate.id),
        )
        upsert({
          ...prev,
          ...val,
        })
      },
    [taskTeammate.id, upsert],
  )

  return {
    taskTeammate,
    setTaskTeammate,
  }
}
