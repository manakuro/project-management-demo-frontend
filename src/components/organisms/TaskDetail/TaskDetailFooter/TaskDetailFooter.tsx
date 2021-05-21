import React from 'react'
import { Flex, Skeleton } from 'src/components/atoms'
import { Comment } from './Comment'

type Props = {
  loading?: boolean
}

export const TaskDetailFooter: React.FC<Props> = (props) => {
  if (props.loading)
    return (
      <Flex flex={1} px={6} py={2} bg="gray.50" alignItems="center">
        <Skeleton w="24px" height="24px" borderRadius="full" />
        <Skeleton w="100%" height="36px" ml={2} />
      </Flex>
    )

  return (
    <Flex flex={1} px={6} py={2} bg="gray.50">
      <Comment />
    </Flex>
  )
}
