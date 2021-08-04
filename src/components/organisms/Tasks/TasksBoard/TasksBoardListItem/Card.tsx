import React, { memo, useCallback } from 'react'
import { FlexProps, Flex } from 'src/components/atoms'
import { useRouter } from 'src/router'
import { transitions } from 'src/styles'
import { useTasksBoardListItemContext } from './Provider'

type Props = FlexProps & {
  taskId: string
}

export const Card: React.FC<Props> = memo<Props>((props) => {
  const { taskId, ...rest } = props
  const { ref } = useTasksBoardListItemContext()
  const { navigateToTaskDetail } = useRouter()

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      await navigateToTaskDetail(taskId)
    },
    [navigateToTaskDetail, taskId],
  )

  return (
    <Flex
      ref={ref}
      flexDirection="column"
      w="full"
      bg="white"
      border={1}
      borderStyle="solid"
      borderColor="gray.200"
      borderRadius="md"
      mt={2}
      _hover={{
        borderColor: 'gray.300',
        boxShadow: 'sm',
      }}
      cursor="pointer"
      transition={transitions.base()}
      p={4}
      onClick={handleClick}
      position="relative"
      {...rest}
    />
  )
})
Card.displayName = 'Card'
