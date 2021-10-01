import { useMemo } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { asyncForEach } from 'src/shared/utils'
import { useMe } from 'src/store/entities/me'
import { useTeammatesTaskColumnsCommand } from 'src/store/entities/teammatesTaskColumns'
import { taskColumnIdsCustomizableState } from '../atom'

export const useMyTasksTaskColumnsCustomizable = () => {
  const { me } = useMe()
  const ids = useRecoilValue(taskColumnIdsCustomizableState(me.id))
  const tasksTaskColumnIds = useMemo(() => ids, [ids])
  const { setTeammatesTaskColumn } = useTeammatesTaskColumnsCommand()

  const setOrderTaskColumn = useRecoilCallback(
    () => async (updatedIds: string[]) => {
      await asyncForEach(updatedIds, async (id, index) => {
        await setTeammatesTaskColumn({
          id,
          order: index,
        })
      })
    },
    [setTeammatesTaskColumn],
  )

  return {
    tasksTaskColumnIds,
    setOrderTaskColumn,
  }
}
