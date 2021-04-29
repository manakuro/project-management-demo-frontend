import React, { memo, useMemo } from 'react'
import { Row, Label } from '../Row'
import { Flex } from 'src/components/atoms'
import { useSubtasks } from 'src/store/subtasks'

type Props = {
  taskId: string
}

export const Subtasks: React.FC<Props> = memo<Props>((props) => {
  const { subtasksByTaskId } = useSubtasks()
  const subtasks = useMemo(() => subtasksByTaskId(props.taskId), [
    props.taskId,
    subtasksByTaskId,
  ])

  console.log('subtasks: ', subtasks)

  return (
    <Row flexDirection="column">
      <Label>Subtasks</Label>
      <Flex>content</Flex>
    </Row>
  )
})
