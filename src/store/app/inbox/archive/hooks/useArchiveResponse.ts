import { useRecoilCallback } from 'recoil'
import { useArchivedTaskActivitiesResponse } from '../archivedTaskActivities'
import { useArchivedTaskActivityTasksResponse } from '../archivedTaskActivityTasks'
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

  const { setArchivedTaskActivities } = useArchivedTaskActivitiesResponse()

  const { setArchivedTaskActivityTasks } =
    useArchivedTaskActivityTasksResponse()

  const setArchive = useRecoilCallback(
    () => (data: ArchiveResponse) => {
      setArchives(data)
      setArchivedWorkspaceActivities(data)
      setArchivedWorkspaceActivityTasks(data)

      setArchivedTaskActivities(data)
      setArchivedTaskActivityTasks(data)
    },
    [
      setArchives,
      setArchivedWorkspaceActivities,
      setArchivedWorkspaceActivityTasks,
      setArchivedTaskActivities,
      setArchivedTaskActivityTasks,
    ],
  )

  return {
    setArchive,
  }
}
