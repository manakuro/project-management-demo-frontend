import { atom, useRecoilState } from 'recoil'
import { Workspace } from './type'

export const workspaceState = atom<Workspace>({
  key: 'workspaceState',
  default: {
    id: '',
    name: '',
    description: '',
  },
})

export const useWorkspace = () => {
  const [workspace, setWorkspace] = useRecoilState(workspaceState)

  return {
    workspace,
    setWorkspace,
  }
}
