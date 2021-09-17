import { useMyTasksTaskColumns } from 'src/store/app/myTasks/taskColumns'
import { useTasksContext } from '../TasksProvider'

type Result = ReturnType<typeof useMyTasksTaskColumns>
const initialUseTaskColumn = (): Result => ({
  taskColumnIds: [],
  setOrderTaskColumn: async () => {},
  canMoveLeft: () => false,
  canMoveRight: () => false,
})

export const useTaskColumnContext = (): Result => {
  const { isMyTasksPage } = useTasksContext()
  const myTasksTaskColumns = useMyTasksTaskColumns()

  if (isMyTasksPage) {
    return {
      ...myTasksTaskColumns,
    }
  }

  return initialUseTaskColumn()
}
