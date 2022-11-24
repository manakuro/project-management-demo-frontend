import React, { memo, useCallback, useState } from 'react'
import { FlexProps, Flex } from 'src/components/atoms'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { useHover } from 'src/hooks/useHover'
import { Content } from './Content'

type Props = FlexProps & {
  taskId: string
  width: string
}

export const TasksAssignee: React.FC<Props> = memo<Props>((props) => {
  const { ref, isHovering } = useHover()
  const [focused, setFocused] = useState(false)

  const handleClick = useCallback(() => {
    setFocused(true)
  }, [])

  const handleUnfocus = useCallback(() => {
    setFocused(false)
  }, [])

  return (
    <TasksListCell
      containerStyle={{
        w: props.width,
        minW: '120px',
        maxW: props.width || '280px',
      }}
      ref={ref}
      cursor="pointer"
      hover
      onClick={handleClick}
    >
      <Flex flex={1} h="full" alignItems="center" maxW="inherit">
        <Content
          taskId={props.taskId}
          isHovering={isHovering}
          focused={focused}
          onUnfocus={handleUnfocus}
        />
      </Flex>
    </TasksListCell>
  )
})
TasksAssignee.displayName = 'TasksAssignee'
