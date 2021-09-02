import { useMemo } from 'react'
import { selectorFamily, useRecoilCallback, useRecoilValue } from 'recoil'
import { asyncForEach } from 'src/shared/utils'
import { useMe } from 'src/store/entities/me'
import {
  taskColumnsByTeammateIdSelector,
  taskColumnSelector,
  useTaskColumnCommands,
} from 'src/store/entities/taskColumns'

const key = (str: string) => `src/store/app/myTasks/taskColumns/${str}`

export const myTaskTaskColumnIdsSelector = selectorFamily<string[], string>({
  key: key('myTaskTaskColumnIdsSelector'),
  get:
    (teammateId: string) =>
    ({ get }) => {
      const taskColumns = get(taskColumnsByTeammateIdSelector(teammateId))

      return taskColumns
        .filter((t) => !t.disabled)
        .sort((a, b) => (a.order > b.order ? 1 : -1))
        .map((t) => t.id)
    },
})

export const myTaskTaskColumnIdsCustomizableSelector = selectorFamily<
  string[],
  string
>({
  key: key('myTaskTaskColumnIdsCustomizableSelector'),
  get:
    (teammateId: string) =>
    ({ get }) => {
      const taskColumns = get(taskColumnsByTeammateIdSelector(teammateId))
      return [...taskColumns]
        .sort((a, b) => (a.order > b.order ? 1 : -1))
        .map((t) => t.id)
    },
})

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
export const useMyTasksTaskColumnsCustomizable = () => {
  const { me } = useMe()
  const ids = useRecoilValue(myTaskTaskColumnIdsCustomizableSelector(me.id))
  const taskColumnIds = useMemo(() => ids, [ids])
  const { upsert: upsertTaskColumn } = useTaskColumnCommands()

  const setOrderTaskColumn = useRecoilCallback(
    ({ snapshot }) =>
      async (updatedIds: string[]) => {
        await asyncForEach(updatedIds, async (id, index) => {
          const prev = await snapshot.getPromise(taskColumnSelector(id))
          upsertTaskColumn({
            ...prev,
            order: index,
          })
        })
      },
    [upsertTaskColumn],
  )

  return {
    taskColumnIds,
    setOrderTaskColumn,
  }
}
