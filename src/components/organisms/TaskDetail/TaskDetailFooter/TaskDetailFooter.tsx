import React from 'react'
import { Flex } from 'src/components/atoms'
import { MyAvatar } from 'src/components/molecules'

type Props = {}

export const TaskDetailFooter: React.FC<Props> = () => {
  return (
    <Flex flex={1} px={6} py={4} h="57px" bg="gray.50">
      <Flex>
        <MyAvatar />
      </Flex>
    </Flex>
  )
}
