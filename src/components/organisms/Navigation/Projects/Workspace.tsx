import React, { useCallback } from 'react'
import {
  Flex,
  Link,
  NextLink,
  Text,
  Icon,
  MenuList,
  MenuItem as AtomsMenuItem,
  Menu,
  MenuButton,
  MenuGroup,
  MenuDivider,
  Portal,
  MenuItemProps,
} from 'src/components/atoms'
import { PADDING_X } from 'src/components/organisms/Navigation/Navigation'
import { useLinkHover, useClickableHover } from 'src/hooks'
import { useInviteModal } from 'src/components/organisms/Modals/InviteModal/useInviteModal'

type Props = {}

export const Workspace: React.VFC<Props> = () => {
  const { _hover } = useLinkHover()
  const clickableStyle = useClickableHover()

  const { setIsOpen } = useInviteModal()

  const handleInvitePeople = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  return (
    <>
      <Menu placement="bottom-end">
        <NextLink href="home" passHref>
          <Link p={2} px={PADDING_X} _hover={_hover}>
            <Flex alignItems="center">
              <Text fontSize="sm" flex={1}>
                Workspace
              </Text>
              <MenuButton {...clickableStyle}>
                <Icon icon="plus" />
              </MenuButton>
            </Flex>
          </Link>
        </NextLink>
        <Portal>
          <MenuList color="text.base">
            <MenuGroup title="Create project">
              <MenuItem icon={<Icon icon="layout" />}>Use a template</MenuItem>
              <MenuItem icon={<Icon icon="spreadsheet" />}>
                Import spreadsheet
              </MenuItem>
              <MenuItem icon={<Icon icon="fileBlank" />}>
                Blank project
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuItem
              icon={<Icon icon="userPlus" />}
              onClick={handleInvitePeople}
            >
              Invite people
            </MenuItem>
          </MenuList>
        </Portal>
      </Menu>
    </>
  )
}

const MenuItem: React.FC<MenuItemProps> = (props) => (
  <AtomsMenuItem fontSize="sm" iconSpacing={2} {...props} />
)
