import React, { memo } from 'react'
import { Flex, FlexProps, Stack } from 'src/components/atoms'
import { TeammateAvatar } from 'src/components/organisms/TeammateAvatar'
import { useHover } from 'src/hooks/useHover'
import { useTask } from 'src/store/entities/tasks'
import { CheckIcon } from './CheckIcon'
import { Container } from './Container'
import { Subtask } from './Subtask'

type Props = {
  taskId: string
} & FlexProps

export const ListItem: React.FC<Props> = memo<Props>((props) => {
  const { taskId } = props
  const { task } = useTask(taskId)
  const { ref, isHovering } = useHover()

  return (
    <Container taskId={taskId} ref={ref}>
      <CheckIcon taskId={taskId} isHovering={isHovering} />
      <TeammateAvatar
        teammateId={task.assigneeId}
        showProfile={false}
        ml={1}
        size="xs"
      />
      <Flex
        noOfLines={2}
        flex={1}
        ml={1}
        fontSize="xs"
        fontWeight="medium"
        lineHeight="14px"
      >
        {task.name}
      </Flex>
      <Stack direction="row" spacing={1} ml={1} mr="auto">
        <Subtask taskId={taskId} />
      </Stack>
    </Container>
  )
})
ListItem.displayName = 'ListItem'
