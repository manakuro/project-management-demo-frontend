import React, { memo, useCallback, useMemo } from 'react'
import { Flex, Link, NextLink, Text, Icon, Portal } from 'src/components/atoms'
import {
  MenuList,
  MenuItem as AtomsMenuItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemProps,
  MenuGroup,
} from 'src/components/organisms/Menu'
import { useInviteModal } from 'src/components/organisms/Modals/InviteModal/useInviteModal'
import { useNavigation } from 'src/components/organisms/Navigation'
import { PADDING_X } from 'src/components/organisms/Navigation/Navigation'
import { useLinkHoverStyle, useClickableHoverStyle } from 'src/hooks'
import { ROUTE_WORKSPACES_OVERVIEW } from 'src/router'
import { useWorkspace } from 'src/store/entities/workspace'

type Props = {}

export const Workspace: React.VFC<Props> = memo(() => {
  const { isExpanded } = useNavigation()
  const { _hover } = useLinkHoverStyle()
  const { clickableHoverLightStyle } = useClickableHoverStyle()
  const { workspace } = useWorkspace()
  const name = useMemo(() => {
    if (!isExpanded) return workspace.name.slice(0, 3)
    return workspace.name
  }, [isExpanded, workspace.name])

  const { setIsOpen } = useInviteModal()

  const handleInvitePeople = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  return (
    <>
      <Menu placement="bottom-end">
        <Flex p={2} px={PADDING_X} _hover={_hover} alignItems="center">
          <Flex flex={1}>
            {!!workspace.id && (
              <NextLink
                href={ROUTE_WORKSPACES_OVERVIEW.href.pathnameObj(workspace.id)}
                passHref
              >
                <Link w="full">
                  <Text fontSize="sm" flex={1}>
                    {name}
                  </Text>
                </Link>
              </NextLink>
            )}
          </Flex>
          <MenuButton {...clickableHoverLightStyle}>
            <Icon icon="plus" />
          </MenuButton>
        </Flex>
        <Portal>
          <MenuList color="text.base">
            <MenuGroup title="Create project">
              <MenuItem icon={<Icon icon="layout" />} isDisabled>
                Use a template
              </MenuItem>
              <MenuItem icon={<Icon icon="spreadsheet" />} isDisabled>
                Import spreadsheet
              </MenuItem>
              <MenuItem icon={<Icon icon="fileBlank" />} isDisabled>
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
})
Workspace.displayName = 'Workspace'

const MenuItem: React.FC<MenuItemProps> = (props) => (
  <AtomsMenuItem fontSize="sm" iconSpacing={2} {...props} />
)
