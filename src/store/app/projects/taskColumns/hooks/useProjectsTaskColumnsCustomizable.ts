import { useMemo } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { asyncForEach } from 'src/shared/utils'
import { useMe } from 'src/store/entities/me'
import { useProjectTaskColumnCommand } from 'src/store/entities/projectTaskColumn'
import { projectsTaskColumnIdsCustomizableState } from '../atom'

export const useProjectsTaskColumnsCustomizable = () => {
  const { me } = useMe()
  const ids = useRecoilValue(projectsTaskColumnIdsCustomizableState(me.id))
  const tasksTaskColumnIds = useMemo(() => ids, [ids])
  const { setProjectsTaskColumn } = useProjectTaskColumnCommand()

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
