import React, { memo, useCallback } from 'react'
import { Flex, Text } from 'src/components/atoms'
import { useInviteModal } from 'src/components/organisms/Modals'
import { TeammateAvatar } from 'src/components/organisms/TeammateAvatar'
import { useClickableHoverStyle } from 'src/hooks'

type Props = {}

export const AddMemberListItem: React.VFC<Props> = memo<Props>(() => {
  const { setIsOpen } = useInviteModal()
  const { clickableHoverLightStyle } = useClickableHoverStyle()

  const handleClick = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  return (
    <Flex
      flex={1}
      py={3}
      alignItems="center"
      onClick={handleClick}
      cursor="pointer"
      {...clickableHoverLightStyle}
    >
      <TeammateAvatar teammateId="" size="sm" />
      <Flex
        ml={3}
        flexDirection="column"
        minW="1px"
        flex={1}
        justifyContent="center"
      >
        <Text fontSize="sm" fontWeight="medium" color="text.muted">
          Add member
        </Text>
      </Flex>
    </Flex>
  )
})
AddMemberListItem.displayName = 'AddMemberListItem'
