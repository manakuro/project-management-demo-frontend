import { useRecoilValue } from 'recoil'
import { workspaceActivityTaskIdsState } from '../atom'

export const useWorkspaceActivityTaskIds = () => {
  const workspaceActivityTaskIds = useRecoilValue(workspaceActivityTaskIdsState)

  return {
    workspaceActivityTaskIds,
  }
}
