import type React from 'react';
import { useCallback } from 'react';
import { useInviteModal } from 'src/components/features/organisms/Modals/InviteModal/useInviteModal';
import { Divider } from 'src/components/features/organisms/Navigation/Divider';
import { Icon, ListItem, Text } from 'src/components/ui/atoms';
import { transitions } from 'src/styles';
import { PADDING_X } from '../Navigation';

export const InviteTeammates: React.FC = () => {
  const { setIsOpen } = useInviteModal();

  const handleClick = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return (
    <>
      <Divider />
      <ListItem
        display="flex"
        alignItems="center"
        px={PADDING_X}
        py={4}
        _hover={{
          bg: 'navigation.hover.dark',
        }}
        transition={transitions.base()}
        cursor="pointer"
        onClick={handleClick}
      >
        <Icon icon="userPlus" color="primary" mr={PADDING_X} mt="-2px" />
        <Text fontSize="sm">Invite teammates</Text>
      </ListItem>
    </>
  );
};
