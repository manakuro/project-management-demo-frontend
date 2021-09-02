import { useMemo } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { asyncForEach } from 'src/shared/utils'
import { useMe } from 'src/store/entities/me'
import {
  taskColumnSelector,
  useTaskColumnCommands,
} from 'src/store/entities/taskColumns'
import { myTaskTaskColumnIdsSelector } from '../atom'

export const useMyTasksTaskColumns = () => {
  const { me } = useMe()
  const ids = useRecoilValue(myTaskTaskColumnIdsSelector(me.id))
  const taskColumnIds = useMemo(() => ids, [ids])
  const { upsert: upsertTaskColumn } = useTaskColumnCommands()

  const setOrderTaskColumn = useRecoilCallback(
    ({ snapshot }) =>
      async (startIndex: number, endIndex: number) => {
        const newIds = Array.from(ids)
        const [deleted] = newIds.splice(startIndex, 1)
        newIds.splice(endIndex, 0, deleted)

        await asyncForEach(newIds, async (id, index) => {
          const prev = await snapshot.getPromise(taskColumnSelector(id))
          upsertTaskColumn({
            ...prev,
            order: index,
          })
        })
      },
    [ids, upsertTaskColumn],
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
    taskColumnIds,
    setOrderTaskColumn,
    canMoveLeft,
    canMoveRight,
  }
}
