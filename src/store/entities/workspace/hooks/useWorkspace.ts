import { useRecoilState } from 'recoil'
import { workspaceState } from '../atom'
import { useWorkspaceUpdatedSubscription } from './useWorkspaceUpdatedSubscription'

export const useWorkspace = () => {
  const [workspace, setVal] = useRecoilState(workspaceState)

  const { hasDescriptionUpdated } = useWorkspaceUpdatedSubscription({
    workspaceId: workspace.id,
  })

  return {
    workspace,
    setWorkspace: setVal,
    hasDescriptionUpdated,
  }
}
