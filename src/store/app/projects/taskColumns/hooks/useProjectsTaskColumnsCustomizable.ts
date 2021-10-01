import { useMemo } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { asyncForEach } from 'src/shared/utils'
import { useMe } from 'src/store/entities/me'
import { useProjectsTaskColumnsCommand } from 'src/store/entities/projectsTaskColumns'
import { projectsTaskColumnIdsCustomizableSelector } from '../atom'

export const useProjectsTaskColumnsCustomizable = () => {
  const { me } = useMe()
  const ids = useRecoilValue(projectsTaskColumnIdsCustomizableSelector(me.id))
  const tasksTaskColumnIds = useMemo(() => ids, [ids])
  const { setProjectsTaskColumn } = useProjectsTaskColumnsCommand()

  const setOrderTaskColumn = useRecoilCallback(
    () => async (updatedIds: string[]) => {
      await asyncForEach(updatedIds, async (id, index) => {
        await setProjectsTaskColumn({
          id,
          order: index,
        })
      })
    },
    [setProjectsTaskColumn],
  )

  return {
    tasksTaskColumnIds,
    setOrderTaskColumn,
  }
}
