import { useMemo } from 'react';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import type { Teammate } from 'src/store/entities/teammate';

const key = (str: string) =>
  `src/components/organisms/Modals/ShareProjectModal/useShareProjectModalInvitedTeammates/${str}`;

const invitedTeammatesState = atom<Teammate[]>({
  key: key('invitedTeammatesState'),
  default: [],
});

export const useShareProjectModalInvitedTeammates = () => {
  const [invitedTeammates, setInvitedTeammates] = useRecoilState(
    invitedTeammatesState,
  );
  const resetInvitedTeammates = useResetRecoilState(invitedTeammatesState);

  const hasInvitedTeammates = useMemo(
    () => !!invitedTeammates.length,
    [invitedTeammates.length],
  );

  return {
    invitedTeammates,
    setInvitedTeammates,
    resetInvitedTeammates,
    hasInvitedTeammates,
  };
};
