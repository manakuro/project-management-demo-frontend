import React, { memo } from 'react'
import { Flex, Icon, IconButton, Stack, Text } from 'src/components/atoms'
import { Teammate } from './Teammate'
import { LeaveTaskButton } from './LeaveTaskButton'
import { useTasksListDetail } from 'src/components/organisms'
import { useTask } from 'src/store/tasks'

type Props = {}

export const Collaborators: React.FC<Props> = memo(() => {
  const { taskId } = useTasksListDetail()
  const { task } = useTask(taskId)

  return (
    <Flex flex={1} mt={4} pl={8} pb={2} alignItems="center">
      <Text fontSize="xs" color="text.muted" fontWeight="medium">
        Collaborators
      </Text>
      <Stack spacing={2} direction="row" alignItems="center" ml={4}>
        {task.teammateIds.map((t) => (
          <Teammate teammateId={t} key={t} />
        ))}
        <IconButton
          aria-label="add collaborators"
          icon={<Icon icon="plus" color="text.muted" />}
          variant="ghost"
          size="sm"
        />
      </Stack>
      <Flex alignItems="center" ml="auto" mt={1}>
        <LeaveTaskButton />
      </Flex>
    </Flex>
  )
})
Collaborators.displayName = 'Collaborators'
