import { useRecoilCallback, useRecoilValue } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { useTeammateTaskColumnCommand } from 'src/store/entities/teammateTaskColumn'
import { taskColumnIdsCustomizableState } from '../atom'

export const useMyTasksTaskColumnsCustomizable = () => {
  const { me } = useMe()
  const tasksTaskColumnIds = useRecoilValue(
    taskColumnIdsCustomizableState(me.id),
  )
  const { setTeammateTaskColumnOrder } = useTeammateTaskColumnCommand()

  const setTaskColumnOrder = useRecoilCallback(
    () => (updatedIds: string[]) => {
      setTeammateTaskColumnOrder(updatedIds)
    },
    [setTeammateTaskColumnOrder],
  )

  return {
    tasksTaskColumnIds,
    setTaskColumnOrder,
  }
}
