import { useRecoilCallback } from 'recoil'
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

  const setArchive = useRecoilCallback(
    () => (data: ArchiveResponse) => {
      setArchives(data)
      setArchivedWorkspaceActivities(data)
      setArchivedWorkspaceActivityTasks(data)
    },
    [
      setArchives,
      setArchivedWorkspaceActivities,
      setArchivedWorkspaceActivityTasks,
    ],
  )

  return {
    setArchive,
  }
}
