import { useRecoilValue } from 'recoil'
import { workspaceActivitySelector } from '../atom'

export const useWorkspaceActivity = (workspaceActivityId: string) => {
  const workspaceActivity = useRecoilValue(
    workspaceActivitySelector(workspaceActivityId),
  )

  return {
    workspaceActivity,
  }
}
