import React, { memo, useCallback, useState } from 'react'
import { FlexProps } from 'src/components/atoms'
import { PriorityChip } from 'src/components/molecules'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { useTask } from 'src/store/entities/tasks'
import { Input } from './Input'

type Props = FlexProps & {
  taskId: string
  width: string
}

export const TasksPriority: React.VFC<Props> = memo<Props>((props) => {
  const { task } = useTask(props.taskId)
  const [focused, setFocused] = useState<boolean>(false)

  const onFocus = useCallback(() => {
    setFocused(true)
  }, [])

  const onUnfocus = useCallback(() => {
    setFocused(false)
  }, [])

  return (
    <TasksListCell
      hover
      cursor="pointer"
      onClick={onFocus}
      containerStyle={{
        w: props.width,
        minW: '120px',
        maxW: '280px',
        position: 'relative',
        zIndex: focused ? 'docked' : '',
      }}
    >
      {!focused && <PriorityChip taskPriorityType={task.priority} />}
      {focused && (
        <Input focused={focused} onClose={onUnfocus} taskId={props.taskId} />
      )}
    </TasksListCell>
  )
})
TasksPriority.displayName = 'TasksProjects'
