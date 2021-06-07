import React, { memo, useCallback, useState } from 'react'
import { FlexProps, Stack } from 'src/components/atoms'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { TagChip } from 'src/components/molecules'
import { Input } from './Input'
import { useTagByTask } from 'src/store/entities/tags'

type Props = FlexProps & {
  taskId: string
}

export const TasksTags: React.VFC<Props> = memo<Props>((props) => {
  const { tagIds } = useTagByTask(props.taskId)
  const [focused, setFocused] = useState<boolean>(false)

  const onFocus = useCallback(() => {
    setFocused(true)
  }, [])

  const onUnfocus = useCallback(() => {
    setFocused(false)
  }, [])

  return (
    <TasksListCell
      w="12%"
      hover
      cursor="pointer"
      onClick={onFocus}
      position="relative"
      zIndex={focused ? 'docked' : 0}
    >
      {!focused && (
        <Stack direction="row" spacing={1} overflow="hidden">
          {tagIds.map((id) => (
            <TagChip key={id} tagId={id} />
          ))}
        </Stack>
      )}
      {focused && (
        <Input focused={focused} onClose={onUnfocus} taskId={props.taskId} />
      )}
    </TasksListCell>
  )
})
TasksTags.displayName = 'TasksProjects'
