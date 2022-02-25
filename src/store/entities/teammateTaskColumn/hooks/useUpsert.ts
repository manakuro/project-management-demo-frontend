import { useRecoilCallback } from 'recoil'
import { teammateTaskColumnState } from '../atom'
import { TeammateTaskColumn } from '../type'

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (taskColumn: Partial<TeammateTaskColumn> & { id: string }) => {
        set(teammateTaskColumnState(taskColumn.id), (prev) => {
          return {
            ...prev,
            ...taskColumn,
          }
        })
      },
    [],
  )
  return {
    upsert,
  }
}
