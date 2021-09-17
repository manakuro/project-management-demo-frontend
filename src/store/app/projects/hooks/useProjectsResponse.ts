import { useRecoilCallback } from 'recoil'
import { taskColumnSelector } from 'src/store/entities/taskColumns'
import { useTaskSectionsResponse } from 'src/store/entities/taskSections'
import { projectsTaskStatusState } from '../taskListStatus'
import { ProjectsResponse } from '../type'

export const useProjectsResponse = () => {
  const { setTaskSections } = useTaskSectionsResponse()
  const { setTaskColumns, setTaskStatus } = useSetters()
  const setMyTasks = useRecoilCallback(
    () => (data: ProjectsResponse) => {
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
