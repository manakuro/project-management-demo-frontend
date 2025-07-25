import { useAtom } from 'jotai';
import { workspaceState } from '../atom';
import { useHasDescriptionUpdated } from './useHasDescriptionUpdated';

export const useWorkspace = () => {
  const [workspace, setVal] = useAtom(workspaceState);

  const { hasDescriptionUpdated } = useHasDescriptionUpdated();

  return {
    workspace,
    setWorkspace: setVal,
    hasDescriptionUpdated,
  };
};
