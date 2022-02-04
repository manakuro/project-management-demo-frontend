import { useMyTasksTaskColumnByType } from 'src/store/app/myTasks/taskColumns'
import { useProjectsTaskColumnByType } from 'src/store/app/projects/taskColumns'
import { ProjectTaskColumn } from 'src/store/entities/projectsTaskColumns'
import { TaskColumnTypeValue } from 'src/store/entities/taskColumns'
import { TeammateTaskColumn } from 'src/store/entities/teammatesTaskColumns'
import { useTasksContext } from '../TasksProvider'

type TaskColumn = TeammateTaskColumn | ProjectTaskColumn

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
