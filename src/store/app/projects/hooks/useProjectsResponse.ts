import { useRecoilCallback } from 'recoil'
import { getNodesFromEdges } from 'src/shared/apollo/util'
import {
  ProjectTaskColumnResponse,
  useProjectsTaskColumnResponse,
} from 'src/store/entities/projectsTaskColumn'
import { useProjectsTaskSectionsResponse } from 'src/store/entities/projectsTaskSections'
import { ProjectTaskSectionResponse } from 'src/store/entities/projectsTaskSections/type'
import { taskListStatusState } from '../taskListStatus'
import { ProjectsResponse } from '../type'

export const useProjectsResponse = () => {
  const { setProjectsTaskSections } = useProjectsTaskSectionsResponse()
  const { setTaskColumns, setTaskStatus } = useSetters()
  const setProjects = useRecoilCallback(
    () => (data: ProjectsResponse) => {
      const projectTaskSections = getNodesFromEdges<
        ProjectTaskSectionResponse,
        ProjectsResponse['projectTaskSections']
      >(data.projectTaskSections)

      setProjectsTaskSections(projectTaskSections)
      setTaskColumns(data)
      setTaskStatus(data)
    },
    [setTaskColumns, setProjectsTaskSections, setTaskStatus],
  )

  return {
    setProjects,
  }
}

const useSetters = () => {
  const { setProjectsTaskColumns } = useProjectsTaskColumnResponse()

  const setTaskColumns = useRecoilCallback(
    () => (data: ProjectsResponse) => {
      const projectTaskColumns = getNodesFromEdges<
        ProjectTaskColumnResponse,
        ProjectsResponse['projectTaskColumns']
      >(data.projectTaskColumns)

      setProjectsTaskColumns(projectTaskColumns)
    },
    [setProjectsTaskColumns],
  )

  const setTaskStatus = useRecoilCallback(
    ({ set }) =>
      (data: ProjectsResponse) => {
        if (data.projectTaskListStatus)
          set(taskListStatusState, data.projectTaskListStatus)
      },
    [],
  )

  return {
    setTaskColumns,
    setTaskStatus,
  }
}
