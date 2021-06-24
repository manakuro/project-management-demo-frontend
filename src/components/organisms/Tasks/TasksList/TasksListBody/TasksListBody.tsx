import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'

type Props = {}

const maxH = 72 + 62 + 37
export const TasksListBody: React.FC<Props> = memo<Props>((props) => {
  return (
    <Flex
      flex={1}
      flexDirection="column"
      overflowY="scroll"
      maxH={`calc(100vh - ${maxH}px)`}
      px={6}
      pb={20}
      {...props}
    />
  )
})
TasksListBody.displayName = 'TasksListBody'
