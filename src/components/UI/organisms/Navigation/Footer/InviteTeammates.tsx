import React, { useCallback } from 'react'
import { Text, ListItem, Icon } from 'src/components/UI/atoms'
import { PADDING_X } from '../Navigation'
import { Divider } from 'src/components/UI/organisms/Navigation/Divider'
import { transitions } from 'src/styles'
import { useInviteModal } from 'src/components/UI/organisms/Modals/InviteModal/useInviteModal'

export const InviteTeammates: React.VFC = () => {
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
          bg: 'navigation.hover',
        }}
        transition={transitions.base}
        cursor="pointer"
        onClick={handleClick}
      >
        <Icon icon="userPlus" color="primary" mr={PADDING_X} mt="-2px" />
        <Text fontSize="sm">Invite teammates</Text>
      </ListItem>
    </>
  )
}
