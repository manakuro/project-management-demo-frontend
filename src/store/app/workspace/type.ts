import { ProjectResponse } from 'src/store/entities/projects'
import { WorkspaceResponse as EntityWorkspaceResponse } from 'src/store/entities/workspace'
import { WorkspaceTeammateResponse } from 'src/store/entities/workspaceTeammates'

export type WorkspaceResponse = {
  workspace: EntityWorkspaceResponse
  projects: ProjectResponse[]
  workspaceTeammates: WorkspaceTeammateResponse[]
}
