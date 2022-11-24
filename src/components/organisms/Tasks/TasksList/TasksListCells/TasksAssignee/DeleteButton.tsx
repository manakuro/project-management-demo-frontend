import React, { memo, useCallback } from 'react'
import { Flex, FlexProps, Icon } from 'src/components/atoms'
import { useClickableHoverStyle } from 'src/hooks'
import { useTaskCommand } from 'src/store/entities/task'

type Props = FlexProps & {
  taskId: string
}

export const DeleteButton: React.FC<Props> = memo<Props>((props) => {
  const { unassignTask } = useTaskCommand()
  const { clickableHoverLightStyle } = useClickableHoverStyle()
  const handleClick = useCallback(
    async (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation()
      await unassignTask({ id: props.taskId })
    },
    [props.taskId, unassignTask],
  )

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      h="90%"
      w={6}
      ml="auto"
      bg="gray.50"
      position="absolute"
      right="1px"
    >
      <Icon
        mt="1px"
        icon="x"
        color="text.muted"
        size="sm"
        {...clickableHoverLightStyle}
        onClick={handleClick}
      />
    </Flex>
  )
})
DeleteButton.displayName = 'DeleteButton'
