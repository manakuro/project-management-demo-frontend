import React, { memo, useCallback } from 'react'
import { Icon, IconButton } from 'src/components/atoms'
import { useSubtaskListContext } from 'src/components/organisms/Tasks/TasksList/TasksListItem/Provider'

type Props = {}

export const ExpandIcon: React.FC<Props> = memo<Props>(() => {
  const { showExpandIcon, isSubtaskExpanded, onToggleExpandSubtask } =
    useSubtaskListContext()

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      onToggleExpandSubtask()
    },
    [onToggleExpandSubtask],
  )

  return (
    <IconButton
      onClick={handleClick}
      aria-label="Show sub task"
      icon={
        <Icon
          icon={isSubtaskExpanded ? 'chevronDown' : 'chevronRight'}
          color="text.muted"
          size="sm"
        />
      }
      visibility={showExpandIcon ? 'visible' : 'hidden'}
      size="xs"
      h={5}
      minW={5}
      p={0}
      variant="ghost"
    />
  )
})
ExpandIcon.displayName = 'ExpandIcon'
