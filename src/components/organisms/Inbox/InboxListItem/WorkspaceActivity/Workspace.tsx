import React, { memo, useMemo } from 'react'
import { Flex, FlexProps, Icon, Text, TextProps } from 'src/components/atoms'
import { useInboxListItemContext } from 'src/components/organisms/Inbox/InboxListItem/Provider'
import { useWorkspace } from 'src/store/entities/workspace'
import { transitions } from 'src/styles'

type Props = FlexProps & {
  workspaceId: string
}

export const Workspace: React.FC<Props> = memo<Props>((props) => {
  const { workspaceId } = props
  const { workspace } = useWorkspace()
  const { isHovering } = useInboxListItemContext()
  const textStyle = useMemo(
    (): TextProps => ({
      ...(isHovering ? { opacity: 1 } : { opacity: 0.6 }),
    }),
    [isHovering],
  )
  console.log('workspaceId: ', workspaceId)

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
  )
})

Workspace.displayName = 'Workspace'
