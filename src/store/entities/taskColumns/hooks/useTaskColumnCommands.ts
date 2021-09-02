import { useRecoilCallback } from 'recoil'
import { taskColumnSelector } from '../atom'
import { TaskColumn } from '../type'

export const useTaskColumnCommands = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (taskColumn: TaskColumn) => {
        set(taskColumnSelector(taskColumn.id), taskColumn)
      },
    [],
  )

  return {
    upsert,
  }
}
