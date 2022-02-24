import { useRecoilState } from 'recoil'
import { workspaceState } from '../atom'
import { useHasDescriptionUpdated } from './useHasDescriptionUpdated'

export const useWorkspace = () => {
  const [workspace, setVal] = useRecoilState(workspaceState)

  const { hasDescriptionUpdated } = useHasDescriptionUpdated()

  return {
    workspace,
    setWorkspace: setVal,
    hasDescriptionUpdated,
  }
}
