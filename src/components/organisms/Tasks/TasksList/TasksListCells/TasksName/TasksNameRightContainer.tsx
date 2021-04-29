import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useTasksName } from './TasksNameProvider'

type Props = FlexProps

export const TasksNameRightContainer: React.FC<Props> = memo<Props>((props) => {
  const { showMark } = useTasksName()

  return (
    <Flex
      alignItems="center"
      ml="auto"
      display={showMark ? 'flex' : 'none'}
      {...props}
    />
  )
})
