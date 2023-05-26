import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/ui/atoms'
import { Container } from '../Container'
import { ActionButtons } from './ActionButtons'
import { ClickHandler } from './ClickHandler'
import { TaskList } from './TaskList'
import { Title } from './Title'

type Props = FlexProps & {
  taskActivityId: string
}

export const TaskActivity: React.FC<Props> = memo<Props>((props) => {
  const { taskActivityId } = props

  return (
    <Container>
      <ClickHandler taskActivityId={taskActivityId}>
        <Flex py={4} flex={1} flexDirection="column" maxW="inherit">
          <Title taskActivityId={taskActivityId} />
          <TaskList taskActivityId={taskActivityId} />
        </Flex>
      </ClickHandler>
      <ActionButtons />
    </Container>
  )
})

TaskActivity.displayName = 'TaskActivityList'
