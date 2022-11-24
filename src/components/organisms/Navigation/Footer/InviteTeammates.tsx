import React, { useCallback } from 'react'
import { Text, ListItem, Icon } from 'src/components/atoms'
import { useInviteModal } from 'src/components/organisms/Modals/InviteModal/useInviteModal'
import { Divider } from 'src/components/organisms/Navigation/Divider'
import { transitions } from 'src/styles'
import { PADDING_X } from '../Navigation'

export const InviteTeammates: React.FC = () => {
  const { setIsOpen } = useInviteModal()

  const handleClick = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

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
  )
}
