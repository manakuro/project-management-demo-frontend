import { useCallback } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { useMe } from 'src/store/entities/me'
import {
  useTeammateTaskColumnCommand,
  useTeammateTaskColumn,
  TeammateTaskColumn,
} from 'src/store/entities/teammateTaskColumn'
import { taskColumnIdsState } from '../atom'

export const useMyTasksTaskColumn = (tasksTaskColumnId: string) => {
  const { me } = useMe()
  const { teammatesTaskColumn } = useTeammateTaskColumn(tasksTaskColumnId)
  const { setTeammateTaskColumn, setTeammateTaskColumnOrder } =
    useTeammateTaskColumnCommand()
  const ids = useRecoilValue(taskColumnIdsState(me.id))
  const setTasksTaskColumn = useCallback(
    async (val: Partial<TeammateTaskColumn>) => {
      await setTeammateTaskColumn({ id: tasksTaskColumnId, ...val })
    },
    [setTeammateTaskColumn, tasksTaskColumnId],
  )

  const setTaskColumnOrder = useRecoilCallback(
    () => async (startIndex: number, endIndex: number) => {
      const newIds = Array.from(ids)
      const [deleted] = newIds.splice(startIndex, 1)
      newIds.splice(endIndex, 0, deleted)

      setTeammateTaskColumnOrder(newIds)
    },
    [ids, setTeammateTaskColumnOrder],
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
    setTaskColumnOrder,
    canMoveLeft,
    canMoveRight,
  }
}
