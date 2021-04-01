import React from 'react'
import { Icon, IconButton } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'

type Props = {}

export const SubTasks: React.FC<Props> = () => {
  return (
    <Tooltip
      hasArrow
      label="Add a task to this task. SubTasks can have different assignees and due date"
      aria-label="Subtasks button description"
      size="md"
      openDelay={500}
      textAlign="left"
    >
      <IconButton
        aria-label="Subtasks button"
        icon={<Icon icon="subdirectoryRight" color="text.muted" />}
        variant="ghost"
        size="sm"
      />
    </Tooltip>
  )
}
