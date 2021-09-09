import { useRecoilValue } from 'recoil'
import { workspaceActivityTaskSelector } from '../atom'

export const useWorkspaceActivityTask = (workspaceActivityTaskId: string) => {
  const workspaceActivityTask = useRecoilValue(
    workspaceActivityTaskSelector(workspaceActivityTaskId),
  )

  return {
    workspaceActivityTask,
  }
}
