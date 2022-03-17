import React, { memo } from 'react'
import { Icon, IconButton, Stack } from 'src/components/atoms'
import { useTaskDetail } from 'src/components/organisms/TaskDetail'
import { useTeammateIdsByTaskId } from 'src/store/entities/taskCollaborator'
import { useCollaboratorsContext } from '../Provider'
import { Teammate } from './Teammate'

type Props = {}

export const Teammates: React.FC<Props> = memo(() => {
  const { taskId } = useTaskDetail()
  const { teammateIds } = useTeammateIdsByTaskId(taskId)
  const { isInputFocused, onInputFocus } = useCollaboratorsContext()

  if (isInputFocused) return null

  return (
    <Stack spacing={2} direction="row" alignItems="center" ml={4}>
      {teammateIds.map((id) => (
        <Teammate teammateId={id} key={id} />
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
