import React from 'react'
import { Flex, Textarea } from 'src/components/atoms'

type Props = {}

export const Form: React.FC<Props> = (props) => {
  return (
    <Flex flexDirection="column">
      <Textarea />
    </Flex>
  )
}
