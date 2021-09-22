import { useRecoilCallback } from 'recoil'
import { taskColumnSelector } from 'src/store/entities/taskColumns'
import { useTeammatesTaskSectionsResponse } from 'src/store/entities/teammatesTaskSections'
import { myTaskTaskStatusState } from '../taskListStatus'
import { MyTaskResponse } from '../type'

export const useMyTasksResponse = () => {
  const { setTeammatesTaskSections } = useTeammatesTaskSectionsResponse()
  const { setTaskColumns, setTaskStatus } = useSetters()
  const setMyTasks = useRecoilCallback(
    () => (data: MyTaskResponse) => {
      setTeammatesTaskSections(data.taskSections)
      setTaskColumns(data)
      setTaskStatus(data)
    },
    [setTaskColumns, setTeammatesTaskSections, setTaskStatus],
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
