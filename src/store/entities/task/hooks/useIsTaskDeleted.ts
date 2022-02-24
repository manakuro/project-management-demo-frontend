import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { deletedTasksByTaskIdState } from 'src/store/entities/deletedTask'

export const useIsTaskDeleted = (taskId: string) => {
  const deletedTasks = useRecoilValue(deletedTasksByTaskIdState(taskId))
  const isTaskDeleted = useMemo(
    () => !!deletedTasks.length,
    [deletedTasks.length],
  )

  return {
    isTaskDeleted,
  }
}
