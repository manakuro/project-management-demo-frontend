import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { useMainStyle } from 'src/hooks/useMainStyle'
import { AddTaskButton } from './AddTaskButton'

type Props = {
  onAddTask: () => void
}

export const TasksHeader: React.VFC<Props> = memo<Props>((props) => {
  const { paddingX } = useMainStyle()

  return (
    <Flex flex={1} px={paddingX} py={4}>
      <AddTaskButton onAddTask={props.onAddTask} />
    </Flex>
  )
})
