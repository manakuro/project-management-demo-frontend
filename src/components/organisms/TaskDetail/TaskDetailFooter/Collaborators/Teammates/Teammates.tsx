import React, { memo } from 'react'
import { Icon, IconButton, Stack } from 'src/components/atoms'
import { useTasksListDetail } from 'src/components/organisms'
import { useTask } from 'src/store/entities/tasks'
import { useCollaborators } from '../Provider'
import { Teammate } from './Teammate'

type Props = {}

export const Teammates: React.FC<Props> = memo(() => {
  const { taskId } = useTasksListDetail()
  const { task } = useTask(taskId)
  const { isInputFocused, onInputFocus } = useCollaborators()

  if (isInputFocused) return null

  return (
    <Stack spacing={2} direction="row" alignItems="center" ml={4}>
      {task.teammateIds.map((t) => (
        <Teammate teammateId={t} key={t} />
      ))}
      <IconButton
        aria-label="add collaborators"
        icon={<Icon icon="plus" color="text.muted" />}
        variant="ghost"
        size="sm"
        onClick={onInputFocus}
      />
    </Stack>
  )
})
Teammates.displayName = 'Teammates'
