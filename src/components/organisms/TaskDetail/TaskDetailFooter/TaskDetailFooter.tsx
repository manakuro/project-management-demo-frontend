import React, { memo } from 'react'
import { Flex, Skeleton } from 'src/components/atoms'
import { Collaborators } from './Collaborators'
import { Comment } from './Comment'

type Props = {
  loading?: boolean
}

export const TaskDetailFooter: React.FC<Props> = memo<Props>((props) => {
  if (props.loading)
    return (
      <Flex flex={1} px={6} py={2} bg="gray.50" flexDirection="column">
        <Flex w="full" alignItems="center">
          <Skeleton w="24px" height="24px" borderRadius="full" />
          <Skeleton w="100%" height="36px" ml={2} />
        </Flex>
        <Flex flex={1} mt={4} ml={8}>
          <Skeleton w="100%" height="36px" />
        </Flex>
      </Flex>
    )

  return (
    <Flex
      flex={1}
      px={6}
      py={2}
      bg="gray.50"
      borderTop="1px"
      borderColor="gray.100"
      flexDirection="column"
    >
      <Comment />
      <Collaborators />
    </Flex>
  )
})
TaskDetailFooter.displayName = 'TaskDetailFooter'
