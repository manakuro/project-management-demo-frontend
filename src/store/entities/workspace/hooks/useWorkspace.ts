import { useRecoilState } from 'recoil'
import { workspaceState } from '../atom'

export const useWorkspace = () => {
  const [workspace, setWorkspace] = useRecoilState(workspaceState)

  return {
    workspace,
    setWorkspace,
  }
}
