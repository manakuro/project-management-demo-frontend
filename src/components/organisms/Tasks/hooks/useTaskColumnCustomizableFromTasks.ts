import { useMyTasksTaskColumnsCustomizable } from 'src/store/app/myTasks/taskColumns'
import { useTasksContext } from '../TasksProvider'

type Result = ReturnType<typeof useMyTasksTaskColumnsCustomizable>
const initialUseTaskColumnCustomizable = (): Result => ({
  taskColumnIds: [],
  setOrderTaskColumn: async () => {},
})

export const useTaskColumnCustomizableFromTasks = (): Result => {
  const { isMyTasksPage } = useTasksContext()
  const myTasksTaskColumns = useMyTasksTaskColumnsCustomizable()

  if (isMyTasksPage) {
    return {
      ...myTasksTaskColumns,
    }
  }

  return initialUseTaskColumnCustomizable()
}
