import { useRecoilValue } from 'recoil';
import { archivedWorkspaceActivityState } from '../atom';

export const useArchivedWorkspaceActivity = (
  archivedWorkspaceActivityId: string,
) => {
  const archivedWorkspaceActivity = useRecoilValue(
    archivedWorkspaceActivityState(archivedWorkspaceActivityId),
  );

  return {
    archivedWorkspaceActivity,
  };
};
