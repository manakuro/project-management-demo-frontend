import { useProjectsProjectId } from 'src/store/app/projects/project'
import * as projectsTaskColumns from 'src/store/entities/projectsTaskColumn'
import { TaskColumnTypeValue } from 'src/store/entities/taskColumns'

export const useProjectsTaskColumnByType = (type: TaskColumnTypeValue) => {
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
