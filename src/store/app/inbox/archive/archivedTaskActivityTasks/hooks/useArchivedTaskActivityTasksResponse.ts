import { useRecoilCallback } from 'recoil'
import { useTasksResponse } from 'src/store/entities/task'
import { ArchiveResponse } from '../../type'
import { archivedMyTaskActivityTaskState } from '../atom'

export const useArchivedTaskActivityTasksResponse = () => {
  const { setTasksFromResponse } = useTasksResponse()

  const setArchivedTaskActivityTasks = useRecoilCallback(
    ({ set }) =>
      (data: ArchiveResponse) => {
        data.archivedMyTaskActivities.forEach((d) => {
          d.archivedMyTaskActivityTasks.forEach((t: any) => {
            set(archivedMyTaskActivityTaskState(t.id), t)

            setTasksFromResponse([t.task])
          })
        })
      },
    [setTasksFromResponse],
  )

  return {
    setArchivedTaskActivityTasks,
  }
}
