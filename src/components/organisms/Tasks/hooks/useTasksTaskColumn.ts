import { useMyTasksTaskColumn } from 'src/store/app/myTasks/taskColumns'
import { useProjectsTaskColumns } from 'src/store/app/projects/taskColumns'
import { ProjectTaskColumn } from 'src/store/entities/projectTaskColumn'
import { TeammateTaskColumn } from 'src/store/entities/teammatesTaskColumns'
import { useTasksContext } from '../TasksProvider'

type TaskColumn = ProjectTaskColumn | TeammateTaskColumn

type Result = {
  tasksTaskColumn: TaskColumn
  setTasksTaskColumn: (val: Partial<TaskColumn>) => Promise<void>
  setOrderTaskColumn: (startIndex: number, endIndex: number) => Promise<void>
  canMoveLeft: (id: string) => boolean
  canMoveRight: (id: string) => boolean
}

export const useTasksTaskColumn = (tasksTaskColumnId: string): Result => {
  const { isMyTasksPage } = useTasksContext()
  const myTasks = useMyTasksTaskColumn(tasksTaskColumnId)
  const projects = useProjectsTaskColumns(tasksTaskColumnId)

  if (isMyTasksPage) {
    return {
      tasksTaskColumn: myTasks.tasksTaskColumn,
      setOrderTaskColumn: myTasks.setOrderTaskColumn,
      setTasksTaskColumn: myTasks.setTasksTaskColumn,
      canMoveLeft: myTasks.canMoveLeft,
      canMoveRight: myTasks.canMoveRight,
    }
  }

  return {
    tasksTaskColumn: projects.tasksTaskColumn,
    setOrderTaskColumn: projects.setOrderTaskColumn,
    setTasksTaskColumn: projects.setTasksTaskColumn,
    canMoveLeft: projects.canMoveLeft,
    canMoveRight: projects.canMoveRight,
  }
}
