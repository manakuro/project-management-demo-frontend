import { useRecoilCallback } from 'recoil'
import { TeammateTaskSectionResponse } from 'src/graphql/types/teammateTaskSection'
import { getNodesFromEdges } from 'src/shared/apollo/util'
import {
  TeammateTaskColumnResponse,
  useTeammateTaskColumnResponse,
} from 'src/store/entities/teammateTaskColumn'
import { useTeammatesTaskSectionResponse } from 'src/store/entities/teammatesTaskSection'
import { taskListStatusState } from '../taskListStatus'
import { MyTasksResponse } from '../type'

export const useMyTasksResponse = () => {
  const { setTeammatesTaskSections } = useTeammatesTaskSectionResponse()
  const { setTaskColumns, setTaskStatus } = useSetters()
  const setMyTasks = useRecoilCallback(
    () => (data: MyTasksResponse) => {
      const teammateTaskSections = getNodesFromEdges<
        TeammateTaskSectionResponse,
        MyTasksResponse['teammateTaskSections']
      >(data.teammateTaskSections)

      setTeammatesTaskSections(teammateTaskSections)
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
  const { setTeammatesTaskColumns } = useTeammateTaskColumnResponse()

  const setTaskColumns = useRecoilCallback(
    () => (data: MyTasksResponse) => {
      const teammateTaskSections = getNodesFromEdges<
        TeammateTaskColumnResponse,
        MyTasksResponse['teammateTaskColumns']
      >(data.teammateTaskColumns)

      setTeammatesTaskColumns(teammateTaskSections)
    },
    [setTeammatesTaskColumns],
  )

  const setTaskStatus = useRecoilCallback(
    ({ set }) =>
      (data: MyTasksResponse) => {
        if (data.teammateTaskListStatus) {
          set(taskListStatusState, data.teammateTaskListStatus)
        }
      },
    [],
  )

  return {
    setTaskColumns,
    setTaskStatus,
  }
}
