import React, { memo, useCallback } from 'react'
import {
  Icon,
  IconButton,
  Portal,
  Flex,
  Text,
  FlexProps,
} from 'src/components/atoms'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from 'src/components/organisms/Menu'
import { useInviteModal } from 'src/components/organisms/Modals/InviteModal/useInviteModal'
import { IconType } from 'src/shared/icons'

export const AddButton: React.FC = memo(() => {
  const inviteModal = useInviteModal()

  const handleInvite = useCallback(() => {
    inviteModal.setIsOpen(true)
  }, [inviteModal])

  return (
    <Menu placement="bottom-end" isLazy>
      <MenuButton
        aria-label="Add button"
        borderRadius="full"
        as={IconButton}
        icon={<Icon icon="listPlus" />}
      />
      <Portal>
        <MenuList>
          <MenuItem>
            <IconText icon="checkCircle">Task</IconText>
          </MenuItem>
          <MenuItem>
            <IconText icon="outlineProject">Project</IconText>
          </MenuItem>
          <MenuItem>
            <IconText icon="messageRoundedDots">Message</IconText>
          </MenuItem>
          <MenuItem onClick={handleInvite}>
            <IconText icon="userPlus">Invite</IconText>
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  )
})
AddButton.displayName = 'AddButton'

type IconTextProps = {
  icon: IconType
} & FlexProps

const IconText: React.FC<IconTextProps> = (props) => {
  const { icon, ...rest } = props
  return (
    <Flex alignItems="center" {...rest}>
      <Icon icon={icon} mr={2} mt="-2px" color="gray.500" />
      <Text fontSize="sm">{props.children}</Text>
    </Flex>
  )
}
