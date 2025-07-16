import { useProjectsProjectId } from 'src/store/app/projects/project'
import * as projectsTaskColumns from 'src/store/entities/projectTaskColumn'
import type { TaskColumnTypeValue } from 'src/store/entities/taskColumn'

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
