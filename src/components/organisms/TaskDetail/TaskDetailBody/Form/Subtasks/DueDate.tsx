import React, { memo } from 'react'
import { Icon, Text } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import { useClickableHoverStyle } from 'src/hooks'
import { PopoverDueDatePicker } from 'src/components/organisms'
import { formatDueDate } from 'src/shared/formatDate'
import { useTasksName } from 'src/components/organisms/Tasks/TasksList/TasksListCells'

type Props = {
  dueDate: string
  dueTime: string
}

export const DueDate: React.FC<Props> = memo<Props>((props) => {
  const { clickableHoverLightStyle } = useClickableHoverStyle()
  const { isHovering } = useTasksName()

  if (props.dueDate) {
    return (
      <Tooltip
        hasArrow
        label="Due in 7 days"
        aria-label="Due date"
        size="sm"
        withIcon
      >
        <Text ml={2} fontSize="sm">
          {formatDueDate(props.dueDate)}
        </Text>
      </Tooltip>
    )
  }

  return (
    <PopoverDueDatePicker
      date={props.dueDate}
      time={props.dueTime}
      onChange={(date) => console.log(date)}
    >
      {isHovering && (
        <Tooltip
          hasArrow
          label="Add a due date to this subtask"
          aria-label="Due date"
          size="sm"
          withIcon
        >
          <Icon
            icon="calendarAlt"
            color="text.muted"
            {...clickableHoverLightStyle}
          />
        </Tooltip>
      )}
    </PopoverDueDatePicker>
  )
})
