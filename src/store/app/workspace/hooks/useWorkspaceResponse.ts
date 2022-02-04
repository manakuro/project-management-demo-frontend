import { useRecoilCallback } from 'recoil'
import { useProjectResponse } from 'src/store/entities/project'
import { useTeammateResponse } from 'src/store/entities/teammate'
import { useWorkspaceResponse as useWorkspaceResponseEntity } from 'src/store/entities/workspace'
import { useWorkspaceTeammateResponse } from 'src/store/entities/workspaceTeammate'
import { WorkspaceResponse } from '../type'

export const useWorkspaceResponse = () => {
  const workspaceResponseEntity = useWorkspaceResponseEntity()
  const { setProjects } = useProjectResponse()
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
  const teammatesResponse = useTeammateResponse()
  const workspaceTeammatesResponse = useWorkspaceTeammateResponse()

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
