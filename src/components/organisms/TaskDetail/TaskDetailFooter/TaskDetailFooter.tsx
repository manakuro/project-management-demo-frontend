import React from 'react'
import { Flex } from 'src/components/atoms'
import { Comment } from './Comment'

type Props = {}

export const TaskDetailFooter: React.FC<Props> = () => {
  return (
    <Flex flex={1} px={6} py={2} bg="gray.50">
      <Comment />
    </Flex>
  )
}
