import React, { memo, useMemo } from 'react'
import { useNavigation, PADDING_X } from 'src/components/organisms/Navigation'
import { Flex, Link, NextLink, Text, Icon } from 'src/components/ui/atoms'
import { useLinkHoverStyle } from 'src/hooks'
import {
  ROUTE_WORKSPACES_OVERVIEW,
  useRouter,
  ROUTE_WORKSPACES,
} from 'src/router'
import { useWorkspace } from 'src/store/entities/workspace'
import { WorkspaceMenu } from './WorkspaceMenu'

type Props = {}

export const ListItem: React.FC<Props> = memo(() => {
  const { isExpanded } = useNavigation()
  const { workspace } = useWorkspace()
  const { _hover, selectedStyle } = useLinkHoverStyle()
  const { router } = useRouter()
  const selected = useMemo(
    () => router.asPath.includes(ROUTE_WORKSPACES.href.pathname(workspace.id)),
    [workspace.id, router.asPath],
  )

  return (
    <NextLink
      href={ROUTE_WORKSPACES_OVERVIEW.href.pathnameObj(workspace.id)}
      passHref
      legacyBehavior
    >
      <Link
        w="full"
        p={2}
        px={PADDING_X}
        _hover={_hover}
        {...(selected ? selectedStyle : {})}
      >
        <Flex alignItems="center">
          {isExpanded ? (
            <Flex alignItems="center" flex={1}>
              <Icon icon="group" size="sm" color="text.muted" />
              <Text fontSize="sm" flex={1} ml={2}>
                {workspace.name}
              </Text>
            </Flex>
          ) : (
            <Flex alignItems="center" justifyContent="center" flex={1}>
              <Text fontSize="sm" flex={1}>
                {workspace.name.slice(0, 3)}
              </Text>
            </Flex>
          )}
          <WorkspaceMenu workspaceId={workspace.id} />
        </Flex>
      </Link>
    </NextLink>
  )
})
ListItem.displayName = 'ListItem'
