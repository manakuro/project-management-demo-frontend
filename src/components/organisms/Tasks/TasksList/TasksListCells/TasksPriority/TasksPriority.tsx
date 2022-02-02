import React, { memo, useCallback, useMemo, useState } from 'react'
import { Flex, FlexProps, Icon } from 'src/components/atoms'
import { PriorityChip } from 'src/components/molecules'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { useHover } from 'src/hooks/useHover'
import { useTask } from 'src/store/entities/tasks'
import { Menu } from './Menu'

type Props = FlexProps & {
  taskId: string
  width: string
}

export const TasksPriority: React.VFC<Props> = memo<Props>((props) => {
  const { taskId } = props
  const { task } = useTask(taskId)
  const [focused, setFocused] = useState(false)
  const { ref, isHovering } = useHover()
  const hasPriority = useMemo(() => task.priority !== 0, [task.priority])

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
          <PriorityChip taskId={task.id} />
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
