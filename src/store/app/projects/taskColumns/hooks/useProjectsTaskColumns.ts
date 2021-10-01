import { useCallback } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { asyncForEach } from 'src/shared/utils'
import { useMe } from 'src/store/entities/me'
import {
  useProjectsTaskColumnsCommand,
  useProjectsTaskColumn,
} from 'src/store/entities/projectsTaskColumns'
import { projectsTaskColumnIdsState } from '../atom'
import { ProjectTaskColumn } from '../type'

export const useProjectsTaskColumns = (tasksTaskColumnId: string) => {
  const { me } = useMe()
  const ids = useRecoilValue(projectsTaskColumnIdsState(me.id))
  const { projectsTaskColumn } = useProjectsTaskColumn(tasksTaskColumnId)
  const { setProjectsTaskColumn } = useProjectsTaskColumnsCommand()

  const setTasksTaskColumn = useCallback(
    async (val: Partial<ProjectTaskColumn>) => {
      await setProjectsTaskColumn({ id: tasksTaskColumnId, ...val })
    },
    [setProjectsTaskColumn, tasksTaskColumnId],
  )

  const setOrderTaskColumn = useRecoilCallback(
    () => async (startIndex: number, endIndex: number) => {
      const newIds = Array.from(ids)
      const [deleted] = newIds.splice(startIndex, 1)
      newIds.splice(endIndex, 0, deleted)

      await asyncForEach(newIds, async (id, index) => {
        await setProjectsTaskColumn({
          id,
          order: index,
        })
      })
    },
    [ids, setProjectsTaskColumn],
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
    tasksTaskColumn: projectsTaskColumn,
    setTasksTaskColumn: setTasksTaskColumn,
    setOrderTaskColumn,
    canMoveLeft,
    canMoveRight,
  }
}
