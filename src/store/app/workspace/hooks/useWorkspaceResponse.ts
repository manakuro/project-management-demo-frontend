import { useRecoilCallback } from 'recoil'
import { useProjectsResponse } from 'src/store/entities/project'
import { useTeammatesResponse } from 'src/store/entities/teammates'
import { useWorkspaceResponse as useWorkspaceResponseEntity } from 'src/store/entities/workspace'
import { useWorkspaceTeammatesResponse } from 'src/store/entities/workspaceTeammates'
import { WorkspaceResponse } from '../type'

export const useWorkspaceResponse = () => {
  const workspaceResponseEntity = useWorkspaceResponseEntity()
  const { setProjects } = useProjectsResponse()
  const { setWorkspaceTeammates } = useSetters()

  const setWorkspace = useRecoilCallback(
    () => (data: WorkspaceResponse) => {
      workspaceResponseEntity.setWorkspace(data.workspace)
      setProjects(data.workspace?.projects || [])
      setWorkspaceTeammates(data)
    },
    [workspaceResponseEntity, setProjects, setWorkspaceTeammates],
  )

  return {
    setWorkspace,
  }
}

const useSetters = () => {
  const teammatesResponse = useTeammatesResponse()
  const workspaceTeammatesResponse = useWorkspaceTeammatesResponse()

  const setWorkspaceTeammates = useRecoilCallback(
    () => (data: WorkspaceResponse) => {
      workspaceTeammatesResponse.setWorkspaceTeammates(
        data.workspace?.workspaceTeammates || [],
      )

      const teammates =
        data.workspace?.workspaceTeammates.map((w) => w.teammate) || []
      teammatesResponse.setTeammates(teammates)
    },
    [teammatesResponse, workspaceTeammatesResponse],
  )

  return {
    setWorkspaceTeammates,
  }
}
