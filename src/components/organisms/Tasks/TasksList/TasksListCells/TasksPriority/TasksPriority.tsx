import React, { memo, useCallback, useState } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { PriorityChip } from 'src/components/molecules'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
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
    >
      <Menu taskId={taskId} onOpened={handleOpened} onClosed={handleClosed}>
        <Flex h="full" flex={1} alignItems="center">
          <PriorityChip taskPriorityType={task.priority} />
        </Flex>
      </Menu>
    </TasksListCell>
  )
})
TasksPriority.displayName = 'TasksProjects'
