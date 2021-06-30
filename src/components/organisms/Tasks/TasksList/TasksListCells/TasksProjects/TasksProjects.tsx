import React, { memo, useCallback, useState } from 'react'
import { FlexProps, Stack } from 'src/components/atoms'
import { ProjectChip } from 'src/components/molecules'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { useTasksProjectTaskIds } from 'src/store/entities/tasks/projectIds'
import { Input } from './Input'

type Props = FlexProps & {
  taskId: string
  width: string
}

export const TasksProjects: React.VFC<Props> = memo<Props>((props) => {
  const { projectIds } = useTasksProjectTaskIds(props.taskId)
  const [focused, setFocused] = useState<boolean>(false)

  const onFocus = useCallback(() => {
    setFocused(true)
  }, [])

  const onUnfocus = useCallback(() => {
    setFocused(false)
  }, [])

  return (
    <TasksListCell
      w={props.width}
      minW="120px"
      hover
      cursor="pointer"
      onClick={onFocus}
      position="relative"
      zIndex={focused ? 'docked' : 0}
    >
      {!focused && (
        <Stack direction="row" spacing={1} overflow="hidden">
          {projectIds.map((id) => (
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
