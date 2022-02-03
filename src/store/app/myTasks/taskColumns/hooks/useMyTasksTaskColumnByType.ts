import { TaskColumnTypeValue } from 'src/store/entities/taskColumns'
import { useTeammatesTaskColumnByType } from 'src/store/entities/teammatesTaskColumns'

export const useMyTasksTaskColumnByType = (type: TaskColumnTypeValue) => {
  const { teammatesTaskColumn } = useTeammatesTaskColumnByType(type)

  return {
    tasksTaskColumn: teammatesTaskColumn,
  }
}
