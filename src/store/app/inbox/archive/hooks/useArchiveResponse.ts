import { useRecoilCallback } from 'recoil'
import { InboxArchivePageQuery } from 'src/graphql/types/app/inbox'
import { ArchivedWorkspaceActivityResponse } from 'src/graphql/types/archivedWorkspaceActivity'
import { ArchivedWorkspaceActivityTaskResponse } from 'src/graphql/types/archivedWorkspaceActivityTask'
import { getNodesFromEdges } from 'src/shared/apollo/util'
import {
  ArchivedTaskActivityResponse,
  useArchivedTaskActivitiesResponse,
} from '../archivedTaskActivities'
import {
  ArchivedTaskActivityTaskResponse,
  useArchivedTaskActivityTasksResponse,
} from '../archivedTaskActivityTasks'
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
      setArchives(data.archivedActivities)

      const archivedWorkspaceActivities = getNodesFromEdges<
        ArchivedWorkspaceActivityResponse,
        InboxArchivePageQuery['archivedWorkspaceActivities']
      >(data.archivedWorkspaceActivities)

      const archivedWorkspaceActivityTasks = archivedWorkspaceActivities.reduce(
        (acc, w) => [...acc, ...w.archivedWorkspaceActivityTasks],
        [] as ArchivedWorkspaceActivityTaskResponse[],
      )

      setArchivedWorkspaceActivities(archivedWorkspaceActivities)
      setArchivedWorkspaceActivityTasks(archivedWorkspaceActivityTasks)

      const archivedTaskActivities = getNodesFromEdges<
        ArchivedTaskActivityResponse,
        InboxArchivePageQuery['archivedTaskActivities']
      >(data.archivedTaskActivities)

      const archivedTaskActivityTasks = archivedTaskActivities.reduce(
        (acc, w) => [...acc, ...w.archivedTaskActivityTasks],
        [] as ArchivedTaskActivityTaskResponse[],
      )

      setArchivedTaskActivities(archivedTaskActivities)
      setArchivedTaskActivityTasks(archivedTaskActivityTasks)
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
