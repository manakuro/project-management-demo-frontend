import { useRecoilCallback } from 'recoil'
import { useTasksResponse } from 'src/store/entities/tasks'
import { ArchiveResponse } from '../../type'
import { archivedMyTaskActivityTaskSelector } from '../atom'

export const useArchivedMyTaskActivityTasksResponse = () => {
  const { setTasksFromResponse } = useTasksResponse()

  const setArchivedMyTaskActivityTasks = useRecoilCallback(
    ({ set }) =>
      (data: ArchiveResponse) => {
        data.archivedMyTaskActivities.forEach((d) => {
          d.archivedMyTaskActivityTasks.forEach((t) => {
            set(archivedMyTaskActivityTaskSelector(t.id), t)

            setTasksFromResponse([t.task])
          })
        })
      },
    [setTasksFromResponse],
  )

  return {
    setArchivedMyTaskActivityTasks,
  }
}
