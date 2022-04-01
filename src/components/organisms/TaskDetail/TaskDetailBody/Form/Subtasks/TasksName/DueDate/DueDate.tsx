import React, { memo, useCallback } from 'react'
import { Icon, DueDate as AtomsDueDate } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import { PopoverDueDatePicker } from 'src/components/organisms/Popovers'
import { useClickableHoverStyle } from 'src/hooks'
import { getDifferenceInDays } from 'src/shared/date'
import { useTask } from 'src/store/entities/task'
import { useDueDate } from './useDueDate'

type Props = {
  taskId: string
}

export const DueDate: React.FC<Props> = memo<Props>((props) => {
  const { clickableHoverLightStyle } = useClickableHoverStyle()
  const { onDueDateOpened, onDueDateClosed, showIcon } = useDueDate()
  const { task, setTaskDueDate } = useTask(props.taskId)

  const handleChange = useCallback(
    async (date: Date) => {
      await setTaskDueDate(date)
    },
    [setTaskDueDate],
  )

  return (
    <PopoverDueDatePicker
      date={task.dueDate}
      time={task.dueTime}
      onChange={handleChange}
      onOpened={onDueDateOpened}
      onClosed={onDueDateClosed}
    >
      {task.dueDate ? (
        <Tooltip
          hasArrow
          label={`Due in ${getDifferenceInDays(
            new Date(task.dueDate),
            new Date(),
          )} days`}
          aria-label="Due date"
          size="sm"
          withIcon
        >
          <AtomsDueDate ml={2} fontSize="xs" dueDate={task.dueDate} />
        </Tooltip>
      ) : (
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
      )}
    </PopoverDueDatePicker>
  )
})
DueDate.displayName = 'DueDate'
