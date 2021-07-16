import { atom, useRecoilState } from 'recoil'
import { Workspace } from './type'

const key = (str: string) => `src/store/entities/workspace/${str}`

export const workspaceState = atom<Workspace>({
  key: key('workspaceState'),
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
