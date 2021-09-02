import { useRecoilCallback } from 'recoil'
import { taskColumnSelector } from 'src/store/entities/taskColumns'
import { useTaskSectionsResponse } from 'src/store/entities/taskSections'
import { myTaskTaskStatusState } from '../taskListStatus'
import { MyTaskResponse } from '../type'

export const useMyTasksResponse = () => {
  const { setTaskSections } = useTaskSectionsResponse()
  const { setTaskColumns, setTaskStatus } = useSetters()
  const setMyTasks = useRecoilCallback(
    () => (data: MyTaskResponse) => {
      setTaskSections(data.taskSections)
      setTaskColumns(data)
      setTaskStatus(data)
    },
    [setTaskColumns, setTaskSections, setTaskStatus],
  )

  return {
    setMyTasks,
  }
}

const useSetters = () => {
  const setTaskColumns = useRecoilCallback(
    ({ set }) =>
      (data: MyTaskResponse) => {
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
