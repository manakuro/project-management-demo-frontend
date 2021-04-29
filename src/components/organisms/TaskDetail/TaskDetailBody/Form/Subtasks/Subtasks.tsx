import React, { memo } from 'react'
import { Row, Label } from '../Row'
import { Flex } from 'src/components/atoms'

type Props = {
  taskId: string
}

export const Subtasks: React.FC<Props> = memo(() => {
  return (
    <Row flexDirection="column">
      <Label>Subtasks</Label>
      <Flex>content</Flex>
    </Row>
  )
})
