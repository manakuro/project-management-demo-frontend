import { useCallback } from 'react'
import {
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  DefaultValue,
  atom,
  useRecoilValue,
} from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { uuid } from 'src/shared/uuid'
import { useMe } from 'src/store/entities/me'
import { taskColumnSelector } from 'src/store/entities/taskColumns'
import { useTasks, useTasksCommand } from 'src/store/entities/tasks'
import { myTaskTaskStatusState } from './taskListStatus'
import { MyTask, MyTaskResponse } from './type'

export const myTaskTaskColumnIdsState = atom<string[]>({
  key: 'myTaskTaskColumnIdsState',
  default: [],
})

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

export const useMyTasksTaskColumns = () => {
  const taskColumnIds = useRecoilValue(myTaskTaskColumnIdsState)
  return {
    taskColumnIds,
  }
}

export const useMyTasks = () => {
  const myTaskIds = useRecoilValue(myTaskIdsState)
  const { setTasks } = useTasks()
  const { setTaskColumns, setTaskStatus } = useSetters()

  const setMyTasks = useRecoilCallback(
    ({ set }) =>
      (data: MyTaskResponse) => {
        const myTasks = data.myTasks.map((d) => ({
          ...d,
          taskIds: d.tasks.map((t) => t.id),
        }))
        myTasks.forEach((d) => {
          set(myTaskSelector(d.id), d)
          setTasks(d.tasks)
        })

        setTaskColumns(data)
        setTaskStatus(data)
      },
    [setTaskColumns, setTasks, setTaskStatus],
  )

  return {
    myTaskIds,
    setMyTasks,
  }
}
export const useMyTasksCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (myTask: MyTask) => {
        set(myTaskSelector(myTask.id), myTask)
      },
    [],
  )

  const addMyTask = useCallback(() => {
    const id = uuid()
    upsert({
      ...defaultMyTaskStateValue(),
      id,
    })

    return id
  }, [upsert])

  return {
    upsert,
    addMyTask,
  }
}

export const useMyTask = (myTaskId?: string) => {
  const myTask = useRecoilValue(myTaskSelector(myTaskId || ''))
  const { upsert } = useMyTasksCommand()
  const tasksCommand = useTasksCommand()
  const { me } = useMe()

  const setMyTask = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<MyTask>) => {
        const prev = await snapshot.getPromise(myTaskSelector(myTask.id))
        upsert({
          ...prev,
          ...val,
        })
      },
    [upsert, myTask.id],
  )

  const addTask = useRecoilCallback(
    ({ snapshot }) =>
      async (val?: Partial<MyTask>) => {
        const prev = await snapshot.getPromise(myTaskSelector(myTask.id))
        const newTaskId = tasksCommand.addTask()
        const taskIds = [...prev.taskIds, newTaskId]

        await setMyTask({ ...val, taskIds, teammateId: me.id })
      },
    [myTask.id, tasksCommand, setMyTask, me.id],
  )

  return {
    myTask,
    setMyTask,
    addTask,
  }
}

function useSetters() {
  const setTaskColumns = useRecoilCallback(
    ({ set }) =>
      (data: MyTaskResponse) => {
        set(
          myTaskTaskColumnIdsState,
          data.taskColumns.map((t) => t.id),
        )
        data.taskColumns.forEach((t) => {
          set(taskColumnSelector(t.id), t)
        })
      },
    [],
  )

  const setTaskStatus = useRecoilCallback(
    ({ set }) =>
      (data: MyTaskResponse) => {
        set(myTaskTaskStatusState, data.taskStatus)
      },
    [],
  )

  return {
    setTaskColumns,
    setTaskStatus,
  }
}
