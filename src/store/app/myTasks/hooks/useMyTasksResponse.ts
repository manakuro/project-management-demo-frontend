import { useRecoilCallback } from 'recoil'
import { useTeammatesTaskColumnsResponse } from 'src/store/entities/teammatesTaskColumns'
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
  const { setTeammatesTaskColumns } = useTeammatesTaskColumnsResponse()

  const setTaskColumns = useRecoilCallback(
    () => (data: MyTaskResponse) => {
      setTeammatesTaskColumns(data.taskColumns)
    },
    [setTeammatesTaskColumns],
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
