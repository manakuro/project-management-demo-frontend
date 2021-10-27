import { useRecoilCallback } from 'recoil'
import { useProjectsResponse } from 'src/store/entities/projects'
import { useTeammatesResponse } from 'src/store/entities/teammates'
import { useWorkspaceResponse as useWorkspaceResponseEntity } from 'src/store/entities/workspace'
import { useWorkspaceTeammatesResponse } from 'src/store/entities/workspaceTeammates'
import { WorkspaceResponse } from '../type'

export const useWorkspaceResponse = () => {
  const { setWorkspace: setWorkspaceEntity } = useWorkspaceResponseEntity()
  const { setProjects } = useProjectsResponse()
  const { setWorkspaceTeammates } = useSetters()

  const setWorkspace = useRecoilCallback(
    () => (data: WorkspaceResponse) => {
      setWorkspaceEntity(data.workspace)
      setProjects(data.projects)
      setWorkspaceTeammates(data)
    },
    [setProjects, setWorkspaceEntity, setWorkspaceTeammates],
  )

  return {
    setWorkspace,
  }
}

const useSetters = () => {
  const { setTeammates: setTeammatesFromResponse } = useTeammatesResponse()
  const { setWorkspaceTeammates: setWorkspaceTeammatesFromResponse } =
    useWorkspaceTeammatesResponse()

  const setWorkspaceTeammates = useRecoilCallback(
    () => (data: WorkspaceResponse) => {
      setWorkspaceTeammatesFromResponse(data.workspaceTeammates)
      setTeammatesFromResponse(data.workspaceTeammates)
    },
    [setTeammatesFromResponse, setWorkspaceTeammatesFromResponse],
  )

  return {
    setWorkspaceTeammates,
  }
}
