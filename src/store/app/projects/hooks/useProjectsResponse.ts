import { useRecoilCallback } from 'recoil'
import { useProjectsTaskSectionsResponse } from 'src/store/entities/projectsTaskSections'
import { taskColumnSelector } from 'src/store/entities/taskColumns'
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
  const setTaskColumns = useRecoilCallback(
    ({ set }) =>
      (data: ProjectsResponse) => {
        data.taskColumns.forEach((t) => {
          set(taskColumnSelector(t.id), t)
        })
      },
    [],
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
