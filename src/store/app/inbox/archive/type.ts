import { ArchivedWorkspaceActivityResponse } from './archivedWorkspaceActivities'
import { Archive } from './archives'

export type ArchiveResponse = {
  archivedWorkspaceActivities: ArchivedWorkspaceActivityResponse[]
  archivedTaskActivities: any[]
  archives: Archive[]
}
