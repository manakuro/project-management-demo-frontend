import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { Container } from '../Container'
import { TaskList } from './TaskList'
import { Title } from './Title'

type Props = FlexProps & {
  taskActivityId: string
}

export const TaskActivity: React.FC<Props> = memo<Props>((props) => {
  const { taskActivityId } = props

  return (
    <Container>
      <Flex py={4} flex={1} flexDirection="column" maxW="inherit">
        <Title taskActivityId={taskActivityId} />
        <TaskList taskActivityId={taskActivityId} />
      </Flex>
    </Container>
  )
})

TaskActivity.displayName = 'TaskActivity'
