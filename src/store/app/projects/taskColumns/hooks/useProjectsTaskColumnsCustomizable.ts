import { useMemo } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { asyncForEach } from 'src/shared/utils'
import { useMe } from 'src/store/entities/me'
import {
  taskColumnSelector,
  useTaskColumnCommands,
} from 'src/store/entities/taskColumns'
import { projectsTaskColumnIdsCustomizableSelector } from '../atom'

export const useProjectsTaskColumnsCustomizable = () => {
  const { me } = useMe()
  const ids = useRecoilValue(projectsTaskColumnIdsCustomizableSelector(me.id))
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
