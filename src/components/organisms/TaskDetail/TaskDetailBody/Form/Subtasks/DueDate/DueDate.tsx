import React, { memo } from 'react'
import { Icon, Text } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import { useClickableHoverStyle } from 'src/hooks'
import { PopoverDueDatePicker } from 'src/components/organisms'
import { formatDueDate } from 'src/shared/date'
import { getDifferenceInDays } from 'src/shared/date'
import { useDueDate } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/Subtasks/DueDate/useDueDate'

type Props = {
  dueDate: string
  dueTime?: string
}

export const DueDate: React.FC<Props> = memo<Props>((props) => {
  const { clickableHoverLightStyle } = useClickableHoverStyle()
  const { onDueDateOpened, onDueDateClosed, showIcon } = useDueDate()

  if (props.dueDate) {
    const days = getDifferenceInDays(new Date(props.dueDate), new Date())
    return (
      <Tooltip
        hasArrow
        label={`Due in ${days} days`}
        aria-label="Due date"
        size="sm"
        withIcon
      >
        <Text ml={2} fontSize="xs">
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
      onOpened={onDueDateOpened}
      onClosed={onDueDateClosed}
    >
      <Tooltip
        hasArrow
        label="Add a due date to this subtask"
        aria-label="Due date"
        size="sm"
        withIcon
      >
        <Icon
          visibility={showIcon ? 'visible' : 'hidden'}
          pointerEvents={showIcon ? 'auto' : 'none'}
          icon="calendarAlt"
          color="text.muted"
          {...clickableHoverLightStyle}
        />
      </Tooltip>
    </PopoverDueDatePicker>
  )
})