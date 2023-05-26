import React, { memo, useCallback, useMemo, useState } from 'react'
import { PriorityChip } from 'src/components/features/molecules/Chips'
import { TasksListCell } from 'src/components/features/organisms/Tasks/TasksList/TasksListCell'
import { Flex, FlexProps, Icon } from 'src/components/ui/atoms'
import { useHover } from 'src/hooks/useHover'
import { useTask } from 'src/store/entities/task'
import { Menu } from './Menu'

type Props = FlexProps & {
  taskId: string
  width: string
}

export const TasksPriority: React.FC<Props> = memo<Props>((props) => {
  const { taskId } = props
  const { task } = useTask(taskId)
  const [focused, setFocused] = useState(false)
  const { ref, isHovering } = useHover()
  const hasPriority = useMemo(
    () => !!task.taskPriorityId,
    [task.taskPriorityId],
  )

  const showMenuIcon = useMemo(
    () => !hasPriority && isHovering,
    [hasPriority, isHovering],
  )

  const handleOpened = useCallback(() => {
    setFocused(true)
  }, [])

  const handleClosed = useCallback(() => {
    setFocused(false)
  }, [])

  return (
    <TasksListCell
      hover
      cursor="pointer"
      containerStyle={{
        w: props.width,
        minW: '120px',
        maxW: '280px',
        position: 'relative',
      }}
      focused={focused}
      ref={ref}
    >
      <Menu taskId={taskId} onOpened={handleOpened} onClosed={handleClosed}>
        <Flex h="full" flex={1} alignItems="center">
          <PriorityChip taskPriorityId={task.taskPriorityId} />
          {showMenuIcon && (
            <Icon
              ml="auto"
              mt="1px"
              icon="chevronDown"
              color="text.muted"
              size="sm"
            />
          )}
        </Flex>
      </Menu>
    </TasksListCell>
  )
})
TasksPriority.displayName = 'TasksPriority'
