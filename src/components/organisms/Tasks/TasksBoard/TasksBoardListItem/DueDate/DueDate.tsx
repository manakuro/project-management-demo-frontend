import React, { memo, useCallback, useMemo } from 'react'
import {
  FlexProps,
  Icon,
  DueDate as AtomsDueDate,
  Button,
} from 'src/components/atoms'
import { PopoverDueDatePicker } from 'src/components/organisms'
import { useClickableHoverStyle } from 'src/hooks'
import { useTask } from 'src/store/entities/tasks'
import { useTasksBoardListItemContext } from '../Provider'

type Props = FlexProps & {
  taskId: string
}

export const DueDate: React.VFC<Props> = memo<Props>((props) => {
  const { task, setTask } = useTask(props.taskId)
  const hasDueDate = useMemo(() => !!task.dueDate, [task.dueDate])
  const { isHovering } = useTasksBoardListItemContext()
  const { clickableHoverLightStyle } = useClickableHoverStyle()

  const handleChange = useCallback(
    async (date: Date) => {
      await setTask({ dueDate: date.toISOString() })
    },
    [setTask],
  )

  return (
    <PopoverDueDatePicker date={task.dueDate} onChange={handleChange}>
      {!hasDueDate && (
        <Icon
          icon="calendarAlt"
          color="text.muted"
          visibility={isHovering ? 'visible' : 'hidden'}
          {...clickableHoverLightStyle}
        />
      )}
      {hasDueDate && (
        <Button variant="ghost" h={5} minH={5} w="44px" minW="44px">
          <AtomsDueDate fontSize="xs" dueDate={task.dueDate} />
        </Button>
      )}
    </PopoverDueDatePicker>
  )
})
DueDate.displayName = 'TasksDueDate'
