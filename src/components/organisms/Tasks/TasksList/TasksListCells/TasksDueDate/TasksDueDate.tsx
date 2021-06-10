import React, { memo, useCallback, useMemo } from 'react'
import { FlexProps, Icon, DueDate, Flex } from 'src/components/atoms'
import { PopoverDueDatePicker } from 'src/components/organisms'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { useClickableHoverStyle } from 'src/hooks'
import { useHover } from 'src/hooks/useHover'
import { useTaskColumn } from 'src/store/entities/taskColumns'
import { useTask } from 'src/store/entities/tasks'

type Props = FlexProps & {
  taskId: string
  taskColumnId: string
}

export const TasksDueDate: React.VFC<Props> = memo<Props>((props) => {
  const { task, setTask } = useTask(props.taskId)
  const hasDueDate = useMemo(() => !!task.dueDate, [task.dueDate])
  const { ref, isHovering } = useHover()
  const { clickableHoverLightStyle } = useClickableHoverStyle()
  const { taskColumn } = useTaskColumn(props.taskColumnId)
  const showIcon = useMemo(
    () => !hasDueDate && isHovering,
    [hasDueDate, isHovering],
  )
  const handleChange = useCallback(
    async (date: Date) => {
      await setTask({ dueDate: date.toISOString() })
    },
    [setTask],
  )

  return (
    <TasksListCell
      w={taskColumn.width}
      minW="120px"
      hover
      ref={ref}
      cursor="pointer"
    >
      <PopoverDueDatePicker
        linkStyle={{ w: 'full', h: 'full' }}
        date={task.dueDate}
        onChange={handleChange}
      >
        <Flex flex={1} h="full" alignItems="center">
          {showIcon && (
            <Icon
              icon="calendarAlt"
              color="text.muted"
              {...clickableHoverLightStyle}
            />
          )}
          <DueDate fontSize="xs" dueDate={task.dueDate} />
        </Flex>
      </PopoverDueDatePicker>
    </TasksListCell>
  )
})
TasksDueDate.displayName = 'TasksDueDate'
