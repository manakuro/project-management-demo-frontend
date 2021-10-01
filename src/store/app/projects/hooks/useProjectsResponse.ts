import { useRecoilCallback } from 'recoil'
import { useProjectsTaskColumnsResponse } from 'src/store/entities/projectsTaskColumns'
import { useProjectsTaskSectionsResponse } from 'src/store/entities/projectsTaskSections'
import { projectsTaskStatusState } from '../taskListStatus'
import { ProjectsResponse } from '../type'

export const useProjectsResponse = () => {
  const { setProjectsTaskSections } = useProjectsTaskSectionsResponse()
  const { setTaskColumns, setTaskStatus } = useSetters()
  const setProjects = useRecoilCallback(
    () => (data: ProjectsResponse) => {
      setProjectsTaskSections(data.taskSections)
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
  const { setProjectsTaskColumns } = useProjectsTaskColumnsResponse()

  const setTaskColumns = useRecoilCallback(
    () => (data: ProjectsResponse) => {
      data.taskColumns.forEach((t) => {
        setProjectsTaskColumns([t])
      })
    },
    [setProjectsTaskColumns],
  )

  const setTaskStatus = useRecoilCallback(
    ({ set }) =>
      (data: ProjectsResponse) => {
        set(projectsTaskStatusState, data.taskStatus)
      },
    [],
  )

  return {
    setTaskColumns,
    setTaskStatus,
  }
}
