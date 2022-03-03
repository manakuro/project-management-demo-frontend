import { useRecoilCallback, useRecoilValue } from 'recoil'
import { taskColumnState } from '../atom'
import { TaskColumn } from '../type'
import { useUpsert } from './useUpsert'

export const useTaskColumn = (taskColumnId?: string) => {
  const taskColumn = useRecoilValue(taskColumnState(taskColumnId || ''))
  const { upsert } = useUpsert()

  const setTaskColumn = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<TaskColumn>) => {
        const prev = await snapshot.getPromise(taskColumnState(taskColumn.id))
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
