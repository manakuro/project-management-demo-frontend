import { useCallback } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { asyncForEach } from 'src/shared/utils'
import { useMe } from 'src/store/entities/me'
import {
  useTeammatesTaskColumnsCommand,
  useTeammatesTaskColumn,
  TeammateTaskColumn,
} from 'src/store/entities/teammatesTaskColumns'
import { taskColumnIdsState } from '../atom'

export const useMyTasksTaskColumn = (tasksTaskColumnId: string) => {
  const { me } = useMe()
  const { teammatesTaskColumn } = useTeammatesTaskColumn(tasksTaskColumnId)
  const { setTeammatesTaskColumn } = useTeammatesTaskColumnsCommand()
  const ids = useRecoilValue(taskColumnIdsState(me.id))
  const setTasksTaskColumn = useCallback(
    async (val: Partial<TeammateTaskColumn>) => {
      await setTeammatesTaskColumn({ id: tasksTaskColumnId, ...val })
    },
    [setTeammatesTaskColumn, tasksTaskColumnId],
  )

  const setOrderTaskColumn = useRecoilCallback(
    () => async (startIndex: number, endIndex: number) => {
      const newIds = Array.from(ids)
      const [deleted] = newIds.splice(startIndex, 1)
      newIds.splice(endIndex, 0, deleted)

      await asyncForEach(newIds, async (id, index) => {
        await setTeammatesTaskColumn({ id, order: index })
      })
    },
    [ids, setTeammatesTaskColumn],
  )

  const canMoveLeft = useRecoilCallback(
    () => (id: string) => {
      const currentIndex = ids.indexOf(id)
      return currentIndex > 1
    },
    [ids],
  )

  const canMoveRight = useRecoilCallback(
    () => (id: string) => {
      const currentIndex = ids.indexOf(id)
      return currentIndex !== ids.length - 1
    },
    [ids],
  )

  return {
    tasksTaskColumn: teammatesTaskColumn,
    setTasksTaskColumn,
    setOrderTaskColumn,
    canMoveLeft,
    canMoveRight,
  }
}
