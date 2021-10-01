import { useRecoilCallback } from 'recoil'
import { teammatesTaskColumnState } from '../atom'
import { TeammatesTaskColumn } from '../type'

export const useTeammatesTaskColumnsCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (taskColumn: TeammatesTaskColumn) => {
        set(teammatesTaskColumnState(taskColumn.id), taskColumn)
      },
    [],
  )

  const setTeammatesTaskColumn = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<TeammatesTaskColumn> & { id: string }) => {
        const current = await snapshot.getPromise(
          teammatesTaskColumnState(val.id),
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
