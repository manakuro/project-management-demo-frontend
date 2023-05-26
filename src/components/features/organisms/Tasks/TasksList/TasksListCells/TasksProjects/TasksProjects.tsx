import React, { memo, useCallback, useState } from 'react'
import { TasksListCell } from 'src/components/features/organisms/Tasks/TasksList/TasksListCell'
import { FlexProps, Stack } from 'src/components/ui/atoms'
import { useProjectTaskIdsByTaskId } from 'src/store/entities/projectTask'
import { Input } from './Input'
import { ListItem } from './ListItem'

type Props = FlexProps & {
  taskId: string
  width: string
}

export const TasksProjects: React.FC<Props> = memo<Props>((props) => {
  const { projectTaskIds } = useProjectTaskIdsByTaskId(props.taskId)
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
      {!focused && (
        <Stack direction="row" spacing={1} overflow="hidden">
          {projectTaskIds.map((id) => (
            <ListItem projectTaskId={id} key={id} />
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
