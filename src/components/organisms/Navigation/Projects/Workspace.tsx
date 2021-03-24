import React, { useCallback } from 'react'
import { Flex, Link, NextLink, Text, Icon, Portal } from 'src/components/atoms'
import {
  MenuList,
  MenuItem as AtomsMenuItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemProps,
  MenuGroup,
  useNavigation,
} from 'src/components/organisms'
import { PADDING_X } from 'src/components/organisms/Navigation/Navigation'
import { useLinkHover, useClickableHover } from 'src/hooks'
import { useInviteModal } from 'src/components/organisms/Modals/InviteModal/useInviteModal'

type Props = {}

export const Workspace: React.VFC<Props> = () => {
  const { isExpanded } = useNavigation()
  const { _hover } = useLinkHover()
  const { clickableHoverLightStyle } = useClickableHover()

  const { setIsOpen } = useInviteModal()

  const handleInvitePeople = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  return (
    <>
      <Menu placement="bottom-end">
        <Flex p={2} px={PADDING_X} _hover={_hover} alignItems="center">
          <NextLink href="home" passHref>
            <Link w="full">
              {isExpanded && (
                <Text fontSize="sm" flex={1}>
                  Workspace
                </Text>
              )}
            </Link>
          </NextLink>
          <MenuButton {...clickableHoverLightStyle}>
            <Icon icon="plus" />
          </MenuButton>
        </Flex>
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
