import React, { memo, useCallback, useState } from 'react'
import { FlexProps, Stack } from 'src/components/atoms'
import { ProjectChip } from 'src/components/molecules'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { useTaskColumn } from 'src/store/entities/taskColumns'
import { useTask } from 'src/store/entities/tasks'
import { Input } from './Input'

type Props = FlexProps & {
  taskId: string
  taskColumnId: string
}

export const TasksProjects: React.VFC<Props> = memo<Props>((props) => {
  const { task } = useTask(props.taskId)
  const [focused, setFocused] = useState<boolean>(false)
  const { taskColumn } = useTaskColumn(props.taskColumnId)

  const onFocus = useCallback(() => {
    setFocused(true)
  }, [])

  const onUnfocus = useCallback(() => {
    setFocused(false)
  }, [])

  return (
    <TasksListCell
      w={taskColumn.width}
      hover
      cursor="pointer"
      onClick={onFocus}
      position="relative"
      zIndex={focused ? 'docked' : 0}
    >
      {!focused && (
        <Stack direction="row" spacing={1} overflow="hidden">
          {task.projectIds.map((id) => (
            <ProjectChip key={id} projectId={id} />
          ))}
        </Stack>
      )}
      {focused && (
        <Input focused={focused} onClose={onUnfocus} taskId={props.taskId} />
      )}
    </TasksListCell>
  )
})
TasksProjects.displayName = 'TasksProjects'
