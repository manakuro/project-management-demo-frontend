import React, { memo } from 'react'
import { Icon, IconButton, Stack } from 'src/components/atoms'
import { useTaskDetail } from 'src/components/organisms/TaskDetail'
import { useTasksTeammateIds } from 'src/store/entities/tasks/teammateIds'
import { useCollaboratorsContext } from '../Provider'
import { Teammate } from './Teammate'

type Props = {}

export const Teammates: React.FC<Props> = memo(() => {
  const { taskId } = useTaskDetail()
  const { teammateIds } = useTasksTeammateIds(taskId)
  const { isInputFocused, onInputFocus } = useCollaboratorsContext()

  if (isInputFocused) return null

  return (
    <Stack spacing={2} direction="row" alignItems="center" ml={4}>
      {teammateIds.map((t) => (
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
