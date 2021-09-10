import React, { memo, useMemo } from 'react'
import { Text, TextProps } from 'src/components/atoms'
import { useTask } from 'src/store/entities/tasks'

type Props = {
  taskId: string
  isTransitioning: boolean
} & TextProps

export const TaskName: React.VFC<Props> = memo((props) => {
  const { taskId, isTransitioning, ...rest } = props
  const { task } = useTask(taskId)
  const style = useMemo(
    (): TextProps => ({
      ...(isTransitioning ? { color: 'white' } : {}),
    }),
    [isTransitioning],
  )

  return (
    <Text
      isTruncated
      fontSize="sm"
      ml={2}
      width="60%"
      // TODO: text will be selected when clicking icon button, so currently disable selection
      _selection={{ bg: 'none' }}
      {...style}
      {...rest}
    >
      {task.name}
    </Text>
  )
})
TaskName.displayName = 'TaskName'
