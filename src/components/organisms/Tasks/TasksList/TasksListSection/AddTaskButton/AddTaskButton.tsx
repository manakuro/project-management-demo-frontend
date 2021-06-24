import React from 'react'
import { Icon, IconButton } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import { useHover } from 'src/hooks/useHover'

type Props = {}

export const AddTaskButton: React.FC<Props> = () => {
  const { ref, isHovering } = useHover()

  return (
    <Tooltip
      hasArrow
      label="Add a task to this section"
      aria-label="Add task button"
      size="lg"
      isOpen={isHovering}
    >
      <IconButton
        ref={ref}
        aria-label="Add task button"
        icon={<Icon icon="plus" color="text.muted" />}
        variant="ghost"
        size="sm"
      />
    </Tooltip>
  )
}
