import { useRecoilCallback, useRecoilValue } from 'recoil'
import { taskColumnSelector } from '../atom'
import { TaskColumn } from '../type'
import { useTaskColumnCommands } from './useTaskColumnCommands'

export const useTaskColumn = (taskColumnId?: string) => {
  const taskColumn = useRecoilValue(taskColumnSelector(taskColumnId || ''))
  const { upsert } = useTaskColumnCommands()

  const setTaskColumn = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<TaskColumn>) => {
        const prev = await snapshot.getPromise(
          taskColumnSelector(taskColumn.id),
        )
        upsert({
          ...prev,
          ...val,
        })
      },
    [upsert, taskColumn.id],
  )

  return {
    taskColumn,
    setTaskColumn,
  }
}
