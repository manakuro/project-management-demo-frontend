import type React from 'react';
import { memo, useMemo } from 'react';
import { useInboxListItemContext } from 'src/components/features/organisms/Inbox/InboxListItem/Provider';
import {
  Flex,
  type FlexProps,
  Icon,
  Text,
  type TextProps,
} from 'src/components/ui/atoms';
import { useWorkspace } from 'src/store/entities/workspace';
import { transitions } from 'src/styles';

type Props = FlexProps & {
  workspaceId: string;
};

export const Workspace: React.FC<Props> = memo<Props>(() => {
  const { workspace } = useWorkspace();
  const { isHovering } = useInboxListItemContext();
  const textStyle = useMemo(
    (): TextProps => ({
      ...(isHovering ? { opacity: 1 } : { opacity: 0.6 }),
    }),
    [isHovering],
  );

  return (
    <Flex flex={1}>
      <Flex alignItems="center" ml="2px">
        <Icon icon="group" size="xs" color="text.muted" />
        <Text
          fontSize="xs"
          ml={1}
          transition={transitions.base()}
          {...textStyle}
        >
          {workspace.name}
        </Text>
      </Flex>
    </Flex>
  );
});

Workspace.displayName = 'Workspace';
