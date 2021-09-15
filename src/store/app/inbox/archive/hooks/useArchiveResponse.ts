import { useRecoilCallback } from 'recoil'
import { useArchivedMyTaskActivitiesResponse } from '../archivedMyTaskActivities'
import { useArchivedMyTaskActivityTasksResponse } from '../archivedMyTaskActivityTasks'
import { useArchivedWorkspaceActivitiesResponse } from '../archivedWorkspaceActivities'
import { useArchivedWorkspaceActivityTasksResponse } from '../archivedWorkspaceActivityTasks'
import { useArchivesResponse } from '../archives'
import { ArchiveResponse } from '../type'

export const useArchiveResponse = () => {
  const { setArchives } = useArchivesResponse()
  const { setArchivedWorkspaceActivities } =
    useArchivedWorkspaceActivitiesResponse()

  const { setArchivedWorkspaceActivityTasks } =
    useArchivedWorkspaceActivityTasksResponse()

  const { setArchivedMyTaskActivities } = useArchivedMyTaskActivitiesResponse()

  const { setArchivedMyTaskActivityTasks } =
    useArchivedMyTaskActivityTasksResponse()

  const setArchive = useRecoilCallback(
    () => (data: ArchiveResponse) => {
      setArchives(data)
      setArchivedWorkspaceActivities(data)
      setArchivedWorkspaceActivityTasks(data)

      setArchivedMyTaskActivities(data)
      setArchivedMyTaskActivityTasks(data)
    },
    [
      setArchives,
      setArchivedWorkspaceActivities,
      setArchivedWorkspaceActivityTasks,
      setArchivedMyTaskActivities,
      setArchivedMyTaskActivityTasks,
    ],
  )

  return {
    setArchive,
  }
}
