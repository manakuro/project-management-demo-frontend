import { useRecoilCallback } from 'recoil'
import { teammateTaskColumnState } from '../atom'
import { TeammateTaskColumn } from '../type'

export const useTeammateTaskColumnCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (taskColumn: TeammateTaskColumn) => {
        set(teammateTaskColumnState(taskColumn.id), taskColumn)
      },
    [],
  )

  const setTeammatesTaskColumn = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<TeammateTaskColumn> & { id: string }) => {
        const current = await snapshot.getPromise(
          teammateTaskColumnState(val.id),
        )
        upsert({ ...current, ...val })
      },
    [upsert],
  )

  return {
    upsert,
    setTeammatesTaskColumn,
  }
}
