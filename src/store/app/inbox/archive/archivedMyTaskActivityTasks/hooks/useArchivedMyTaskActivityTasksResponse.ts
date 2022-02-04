import { useRecoilCallback } from 'recoil'
import { useTasksResponse } from 'src/store/entities/task'
import { ArchiveResponse } from '../../type'
import { archivedMyTaskActivityTaskState } from '../atom'

export const useArchivedMyTaskActivityTasksResponse = () => {
  const { setTasksFromResponse } = useTasksResponse()

  const setArchivedMyTaskActivityTasks = useRecoilCallback(
    ({ set }) =>
      (data: ArchiveResponse) => {
        data.archivedMyTaskActivities.forEach((d) => {
          d.archivedMyTaskActivityTasks.forEach((t) => {
            set(archivedMyTaskActivityTaskState(t.id), t)

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
