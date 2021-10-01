import { useMyTasksTaskColumn } from 'src/store/app/myTasks/taskColumns'
import { useProjectsTaskColumns } from 'src/store/app/projects/taskColumns'
import { ProjectsTaskColumn } from 'src/store/entities/projectsTaskColumns'
import { TeammatesTaskColumn } from 'src/store/entities/teammatesTaskColumns'
import { useTasksContext } from '../TasksProvider'

type Result = {
  tasksTaskColumn: TeammatesTaskColumn | ProjectsTaskColumn
  setTasksTaskColumn:
    | ReturnType<typeof useMyTasksTaskColumn>['setTasksTaskColumn']
    | ReturnType<typeof useProjectsTaskColumns>['setTasksTaskColumn']
  setOrderTaskColumn: (startIndex: number, endIndex: number) => Promise<void>
  canMoveLeft: (id: string) => boolean
  canMoveRight: (id: string) => boolean
}

export const useTasksTaskColumn = (tasksTaskColumnId: string): Result => {
  const { isMyTasksPage } = useTasksContext()
  const useMyTasksTaskColumnsResult = useMyTasksTaskColumn(tasksTaskColumnId)
  const useProjectsTaskColumnsResult = useProjectsTaskColumns(tasksTaskColumnId)

  if (isMyTasksPage) {
    return {
      ...useMyTasksTaskColumnsResult,
    }
  }

  return {
    ...useProjectsTaskColumnsResult,
  }
}
