import { useRecoilCallback } from 'recoil'
import { TeammateTaskSectionResponse } from 'src/graphql/types/teammateTaskSection'
import { getNodesFromEdges } from 'src/shared/apollo/util'
import {
  TeammateTaskColumnResponse,
  useTeammatesTaskColumnsResponse,
} from 'src/store/entities/teammatesTaskColumns'
import { useTeammatesTaskSectionsResponse } from 'src/store/entities/teammatesTaskSections'
import { taskListStatusState } from '../taskListStatus'
import { MyTasksResponse } from '../type'

export const useMyTasksResponse = () => {
  const { setTeammatesTaskSections } = useTeammatesTaskSectionsResponse()
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
  const { setTeammatesTaskColumns } = useTeammatesTaskColumnsResponse()

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
