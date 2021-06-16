import { useRecoilCallback, atom, useRecoilValue } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { taskColumnSelector } from 'src/store/entities/taskColumns'
import {
  useTaskSection,
  useTaskSections,
} from 'src/store/entities/taskSections'
import { myTaskTaskStatusState } from './taskListStatus'
import { MyTasks, MyTaskResponse } from './type'

export const myTaskTaskColumnIdsState = atom<string[]>({
  key: 'myTaskTaskColumnIdsState',
  default: [],
})

const myTasksState = atom<MyTasks>({
  key: 'myTasksState',
  default: {
    taskSectionIds: [],
  },
})

export const useMyTasksTaskColumns = () => {
  const taskColumnIds = useRecoilValue(myTaskTaskColumnIdsState)
  return {
    taskColumnIds,
  }
}

export const useMyTasks = () => {
  const state = useRecoilValue(myTasksState)
  const { setTaskSections } = useTaskSections()
  const { setTaskColumns, setTaskStatus } = useSetters()

  const setMyTasks = useRecoilCallback(
    ({ set }) =>
      (data: MyTaskResponse) => {
        const taskSectionIds = data.taskSections.map((t) => t.id)

        set(myTasksState, {
          taskSectionIds,
        })
        setTaskSections(data.taskSections)
        setTaskColumns(data)
        setTaskStatus(data)
      },
    [setTaskColumns, setTaskSections, setTaskStatus],
  )

  return {
    ...state,
    setMyTasks,
  }
}

export const useMyTask = (taskSectionId: string) => {
  const { me } = useMe()
  const useTaskSectionResult = useTaskSection(taskSectionId)

  const addTask = useRecoilCallback(
    () => async () => {
      await useTaskSectionResult.addTask({ teammateId: me.id })
    },
    [me.id, useTaskSectionResult],
  )

  return {
    taskSection: useTaskSectionResult.taskSection,
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
