import { useMemo } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { asyncForEach } from 'src/shared/utils'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { useProjectTaskColumnCommand } from 'src/store/entities/projectTaskColumn'
import { projectsTaskColumnIdsCustomizableState } from '../atom'

export const useProjectsTaskColumnsCustomizable = () => {
  const { projectId } = useProjectsProjectId()
  const ids = useRecoilValue(projectsTaskColumnIdsCustomizableState(projectId))
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
