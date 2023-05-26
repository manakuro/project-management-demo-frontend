import React, { memo, useCallback } from 'react'
import { useInviteModal } from 'src/components/features/organisms/Modals'
import { TeammateAvatar } from 'src/components/features/organisms/TeammateAvatar'
import { Flex, Text } from 'src/components/ui/atoms'
import { useClickableHoverStyle } from 'src/hooks'

type Props = {}

export const AddMemberListItem: React.FC<Props> = memo<Props>(() => {
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
