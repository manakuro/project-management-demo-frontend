import { useRecoilCallback } from 'recoil'
import { useTasksResponse } from 'src/store/entities/tasks'
import { ArchiveResponse } from '../../type'
import { archivedWorkspaceActivityTaskState } from '../atom'

export const useArchivedWorkspaceActivityTasksResponse = () => {
  const { setTasksFromResponse } = useTasksResponse()

  const setArchivedWorkspaceActivityTasks = useRecoilCallback(
    ({ set }) =>
      (data: ArchiveResponse) => {
        data.archivedWorkspaceActivities.forEach((w) => {
          w.archivedWorkspaceActivityTasks.forEach((t) => {
            set(archivedWorkspaceActivityTaskState(t.id), t)

            setTasksFromResponse([t.task])
          })
        })
      },
    [setTasksFromResponse],
  )

  return {
    setArchivedWorkspaceActivityTasks,
  }
}
