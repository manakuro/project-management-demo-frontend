import { useMyTasksTaskColumnByType } from 'src/store/app/myTasks/taskColumns'
import { useProjectsTaskColumnByType } from 'src/store/app/projects/taskColumns'
import { ProjectTaskColumn } from 'src/store/entities/projectTaskColumn'
import { TaskColumnTypeValue } from 'src/store/entities/taskColumn'
import { TeammateTaskColumn } from 'src/store/entities/teammateTaskColumn'
import { useTasksContext } from '../TasksProvider'

type TaskColumn = TeammateTaskColumn | ProjectTaskColumn

type Result = {
  tasksTaskColumn: TaskColumn
}

export const useTasksTaskColumnByType = (type: TaskColumnTypeValue): Result => {
  const { isMyTasksPage } = useTasksContext()
  const myTasks = useMyTasksTaskColumnByType(type)
  const projects = useProjectsTaskColumnByType(type)

  if (isMyTasksPage) {
    return {
      tasksTaskColumn: myTasks.tasksTaskColumn,
    }
  }

  return {
    tasksTaskColumn: projects.tasksTaskColumn,
  }
}
