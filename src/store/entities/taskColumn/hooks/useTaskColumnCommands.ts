import { useRecoilCallback } from 'recoil'
import { taskColumnState } from '../atom'
import { TaskColumn } from '../type'

export const useTaskColumnCommands = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (taskColumn: TaskColumn) => {
        set(taskColumnState(taskColumn.id), taskColumn)
      },
    [],
  )

  return {
    upsert,
  }
}
