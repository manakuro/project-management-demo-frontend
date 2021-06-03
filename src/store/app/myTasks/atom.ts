import {
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  DefaultValue,
  atom,
  useRecoilValue,
  useRecoilState,
} from 'recoil'
import { MyTask, MyTaskResponse } from './type'
import { uniqBy } from 'src/shared/utils'
import { useCallback, useMemo } from 'react'
import { uuid } from 'src/shared/uuid'
import { useTasks } from 'src/store/entities/tasks'

export const myTaskIdsState = atom<string[]>({
  key: 'myTaskIdsState',
  default: [],
})

export const myTasksState = atom<MyTask[]>({
  key: 'myTasksState',
  default: [],
})

export const defaultMyTaskStateValue = (): MyTask => ({
  id: '',
  name: '',
  teammateId: '',
  taskIds: [],
  createdAt: '',
  updatedAt: '',
})
const myTaskState = atomFamily<MyTask, string>({
  key: 'myTaskState',
  default: defaultMyTaskStateValue(),
})

export const myTaskSelector = selectorFamily<MyTask, string>({
  key: 'myTaskSelector',
  get:
    (myTaskId) =>
    ({ get }) =>
      get(myTaskState(myTaskId)),
  set:
    (myTaskId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(myTaskState(myTaskId))
        return
      }

      set(myTaskState(myTaskId), newVal)
      set(myTasksState, (prev) =>
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

      if (get(myTaskIdsState).find((myTaskId) => myTaskId === newVal.id)) return

      set(myTaskIdsState, (prev) => [...prev, newVal.id])
    },
})

export const useMyTasksByTeammateId = (teammateId: string) => {
  const { upsertMyTask } = useMyTask()
  const [myTasksAll, setMyTasksAll] = useRecoilState(myTasksState)

  const addMyTask = useCallback(() => {
    const id = uuid()
    upsertMyTask({
      ...defaultMyTaskStateValue(),
      teammateId,
      id,
    })

    return id
  }, [upsertMyTask, teammateId])

  const deleteMyTask = useRecoilCallback(
    () => (teammateId: string) => {
      const index = myTasksAll.findIndex((f) => f.teammateId === teammateId)
      const newValue = [
        ...myTasksAll.slice(0, index),
        ...myTasksAll.slice(index + 1),
      ]
      setMyTasksAll(newValue)
    },
    [myTasksAll, setMyTasksAll],
  )

  const myTasks = useMemo(
    () => myTasksAll.filter((f) => f.teammateId === teammateId),
    [myTasksAll, teammateId],
  )

  return {
    addMyTask,
    deleteMyTask,
    myTasks,
  }
}

export const useMyTasks = () => {
  const myTaskIds = useRecoilValue(myTaskIdsState)
  const myTasks = useRecoilValue(myTasksState)
  const { setTasks } = useTasks()

  const setMyTasks = useRecoilCallback(
    ({ set }) =>
      (data: MyTaskResponse[]) => {
        const myTasks = data.map((d) => ({
          ...d,
          taskIds: d.tasks.map((t) => t.id),
        }))

        myTasks.forEach((d) => {
          set(myTaskSelector(d.id), d)
          setTasks(d.tasks)
        })
      },
    [setTasks],
  )

  return {
    myTaskIds,
    myTasks,
    setMyTasks,
  }
}

export const useMyTask = (myTaskId?: string) => {
  const myTask = useRecoilValue(myTaskSelector(myTaskId || ''))

  const upsertMyTask = useRecoilCallback(
    ({ set }) =>
      (myTask: MyTask) => {
        set(myTaskSelector(myTask.id), myTask)
      },
    [],
  )

  const setMyTask = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<MyTask>) => {
        const prev = await snapshot.getPromise(myTaskSelector(myTask.id))
        upsertMyTask({
          ...prev,
          ...val,
        })
      },
    [upsertMyTask, myTask.id],
  )

  return {
    myTask,
    upsertMyTask,
    setMyTask,
  }
}