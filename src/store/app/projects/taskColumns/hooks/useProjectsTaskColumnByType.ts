import { useProjectsProjectId } from 'src/store/app/projects/project'
import * as projectsTaskColumns from 'src/store/entities/projectTaskColumn'
import { TaskColumnTypeValue } from 'src/store/entities/taskColumns'

export const useProjectsTaskColumnByType = (type: TaskColumnTypeValue) => {
  const { projectId } = useProjectsProjectId()
  const { projectsTaskColumn } = projectsTaskColumns.useProjectTaskColumnByType(
    {
      type,
      projectId,
    },
  )

  return {
    tasksTaskColumn: projectsTaskColumn,
  }
}
