import {
  PADDING_X,
  useNavigation,
} from '@/components/features/organisms/Navigation';
import { Flex, Icon, Link, NextLink, Text } from '@/components/ui/atoms';
import { useLinkHoverStyle } from '@/hooks';
import {
  ROUTE_WORKSPACES,
  ROUTE_WORKSPACES_OVERVIEW,
  useRouter,
} from '@/router';
import { useWorkspace } from '@/store/entities/workspace';
import { memo, useMemo } from 'react';
import { WorkspaceMenu } from './WorkspaceMenu';

export const ListItem = memo(function ListItem() {
  const { isExpanded } = useNavigation();
  const { workspace } = useWorkspace();
  const { _hover, selectedStyle } = useLinkHoverStyle();
  const { router } = useRouter();
  const selected = useMemo(
    () => router.asPath.includes(ROUTE_WORKSPACES.href.pathname(workspace.id)),
    [workspace.id, router.asPath],
  );

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
  );
});
