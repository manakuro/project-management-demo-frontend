import { useProjectsProjectId } from 'src/store/app/projects/project'
import * as projectsTaskColumns from 'src/store/entities/projectsTaskColumns'
import { TaskColumnType } from 'src/store/entities/taskColumns/types'

export const useProjectsTaskColumnByType = (type: TaskColumnType) => {
  const { projectId } = useProjectsProjectId()
  const { projectsTaskColumn } =
    projectsTaskColumns.useProjectsTaskColumnByType({
      type,
      projectId,
    })

  return {
    tasksTaskColumn: projectsTaskColumn,
  }
}
