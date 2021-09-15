import { ArchivedMyTaskActivityResponse } from './archivedMyTaskActivities'
import { ArchivedWorkspaceActivityResponse } from './archivedWorkspaceActivities'
import { Archive } from './archives'

export type ArchiveResponse = {
  archivedWorkspaceActivities: ArchivedWorkspaceActivityResponse[]
  archivedMyTaskActivities: ArchivedMyTaskActivityResponse[]
  archives: Archive[]
}
