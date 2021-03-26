import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'

type Props = {}

export const TasksList: React.FC<Props> = memo<Props>((props) => {
  return <Flex flex={1}>{props.children}</Flex>
})
