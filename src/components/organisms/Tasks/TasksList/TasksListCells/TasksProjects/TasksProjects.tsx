import React, { memo, useCallback, useState } from 'react'
import { FlexProps, Stack } from 'src/components/atoms'
import { ProjectChip } from 'src/components/molecules'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { useProjectIdsByTaskId } from 'src/store/entities/projectsTasks'
import { Input } from './Input'

type Props = FlexProps & {
  taskId: string
  width: string
}

export const TasksProjects: React.VFC<Props> = memo<Props>((props) => {
  const { projectIds } = useProjectIdsByTaskId(props.taskId)
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
          {projectIds.map((id) => (
            <ProjectChip variant="button" key={id} projectId={id} />
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
