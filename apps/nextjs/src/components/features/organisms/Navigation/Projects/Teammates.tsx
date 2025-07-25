import { memo, useCallback } from 'react';
import { useInviteModal } from 'src/components/features/organisms/Modals';
import { PADDING_X } from 'src/components/features/organisms/Navigation/Navigation';
import { TeammateAvatar } from 'src/components/features/organisms/TeammateAvatar';
import { Wrap, WrapItem } from 'src/components/ui/atoms';
import { useClickableHoverStyle } from 'src/hooks';
import { useTeammates } from 'src/store/entities/teammate';
import { Teammate } from './Teammate';

export const Teammates = memo(function Teammates() {
  const { clickableHoverLightStyle } = useClickableHoverStyle();
  const inviteModal = useInviteModal();
  const { teammateIds } = useTeammates();

  const handleInvitePeople = useCallback(() => {
    inviteModal.setIsOpen(true);
  }, [inviteModal]);

  return (
    <Wrap p={2} px={PADDING_X}>
      {teammateIds.map((t) => (
        <Teammate teammateId={t} key={t} />
      ))}
      <WrapItem>
        <TeammateAvatar
          teammateId=""
          size="xs"
          bg="teal.200"
          {...clickableHoverLightStyle}
          onClick={handleInvitePeople}
        />
      </WrapItem>
    </Wrap>
  );
});
