import { useMyTasksTaskColumnByType } from 'src/store/app/myTasks/taskColumns'
import { useProjectsTaskColumnByType } from 'src/store/app/projects/taskColumns'
import { ProjectsTaskColumn } from 'src/store/entities/projectsTaskColumns'
import { TaskColumnTypeValue } from 'src/store/entities/taskColumns'
import { TeammateTaskColumn } from 'src/store/entities/teammatesTaskColumns'
import { useTasksContext } from '../TasksProvider'

type TaskColumn = TeammateTaskColumn | ProjectsTaskColumn

type Result = {
  tasksTaskColumn: TaskColumn
}

export const useTasksTaskColumnByType = (type: TaskColumnTypeValue): Result => {
  const { isMyTasksPage } = useTasksContext()
  const useMyTasksTaskColumnByTypeResult = useMyTasksTaskColumnByType(type)
  const useProjectTaskColumnByTypeResult = useProjectsTaskColumnByType(type)

  if (isMyTasksPage) {
    return {
      ...useMyTasksTaskColumnByTypeResult,
    }
  }

  return {
    ...useProjectTaskColumnByTypeResult,
  }
}
