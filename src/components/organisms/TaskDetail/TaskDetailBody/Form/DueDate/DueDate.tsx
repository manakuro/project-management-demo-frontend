import React, { memo, useCallback, useMemo } from 'react'
import {
  Button,
  Icon,
  DueDate as AtomsDueDate,
  Box,
} from 'src/components/atoms'
import { PopoverDueDatePicker } from 'src/components/organisms/Popovers'
import { useClickableHoverStyle } from 'src/hooks'
import { useHover } from 'src/hooks/useHover'
import { useTask } from 'src/store/entities/task'
import { Row, Label, Content } from '../Row'

type Props = {
  taskId: string
}

export const DueDate: React.FC<Props> = memo<Props>((props) => {
  const { task, setTaskDueDate, resetTaskDueDate } = useTask(props.taskId)
  const { clickableHoverLightStyle } = useClickableHoverStyle()
  const { ref, isHovering } = useHover()
  const hasDueDate = useMemo(() => !!task.dueDate, [task.dueDate])
  const showResetIcon = useMemo(() => hasDueDate, [hasDueDate])

  const handleChange = useCallback(
    async (date: Date) => {
      await setTaskDueDate(date)
    },
    [setTaskDueDate],
  )
  const handleReset = useCallback(
    async (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation()
      await resetTaskDueDate()
    },
    [resetTaskDueDate],
  )

  return (
    <Row>
      <Label>Due date</Label>
      <Content>
        <PopoverDueDatePicker
          date={task.dueDate}
          time={task.dueTime}
          onChange={handleChange}
        >
          <Button
            as={Box}
            variant="ghost"
            size="sm"
            ref={ref}
            border="1px"
            borderColor="transparent"
            cursor="pointer"
          >
            <Icon icon="calendar" color="text.muted" size="xl" />
            <AtomsDueDate ml={2} fontSize="xs" dueDate={task.dueDate} />
            {showResetIcon && (
              <Icon
                ml={2}
                mt="1px"
                icon="x"
                color="text.muted"
                size="sm"
                visibility={isHovering ? 'visible' : 'hidden'}
                {...clickableHoverLightStyle}
                onClick={handleReset}
              />
            )}
          </Button>
        </PopoverDueDatePicker>
      </Content>
    </Row>
  )
})
DueDate.displayName = 'DueDate'
