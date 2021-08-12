import React, { memo, useCallback, useMemo } from 'react'
import { FlexProps, Flex } from 'src/components/atoms'
import { useRouter } from 'src/router'
import { useTask } from 'src/store/entities/tasks'
import { transitions } from 'src/styles'
import { useTasksBoardListItemContext } from './Provider'

type Props = FlexProps & {
  taskId: string
}

export const Card: React.FC<Props> = memo<Props>((props) => {
  const { taskId, ...rest } = props
  const { ref } = useTasksBoardListItemContext()
  const { navigateToTaskDetail } = useRouter()
  const { task } = useTask(taskId)
  const style = useMemo(
    () => ({
      ...(task.isDone ? { opacity: 0.6 } : {}),
    }),
    [task.isDone],
  )
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
      {...style}
      {...rest}
    />
  )
})
Card.displayName = 'Card'
