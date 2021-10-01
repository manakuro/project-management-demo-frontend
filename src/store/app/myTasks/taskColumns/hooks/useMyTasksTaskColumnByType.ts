import { TaskColumnType } from 'src/store/entities/taskColumns/types'
import { useTeammatesTaskColumnByType } from 'src/store/entities/teammatesTaskColumns'

export const useMyTasksTaskColumnByType = (type: TaskColumnType) => {
  const { teammatesTaskColumn } = useTeammatesTaskColumnByType(type)

  return {
    tasksTaskColumn: teammatesTaskColumn,
  }
}
