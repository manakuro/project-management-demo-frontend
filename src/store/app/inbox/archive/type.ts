import { ArchivedTaskActivityResponse } from './archivedTaskActivities'
import { ArchivedWorkspaceActivityResponse } from './archivedWorkspaceActivities'
import { Archive } from './archives'

export type ArchiveResponse = {
  archivedWorkspaceActivities: ArchivedWorkspaceActivityResponse[]
  archivedMyTaskActivities: ArchivedTaskActivityResponse[]
  archives: Archive[]
}
