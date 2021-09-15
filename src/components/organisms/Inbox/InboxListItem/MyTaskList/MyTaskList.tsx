import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { Container } from '../Container'
import { ActionButtons } from './ActionButtons'
import { ClickHandler } from './ClickHandler'
import { TaskList } from './TaskList'
import { Title } from './Title'

type Props = FlexProps & {
  myTaskListId: string
}

export const MyTaskList: React.FC<Props> = memo<Props>((props) => {
  const { myTaskListId } = props

  return (
    <Container>
      <ClickHandler myTaskListId={myTaskListId}>
        <Flex py={4} flex={1} flexDirection="column" maxW="inherit">
          <Title myTaskListId={myTaskListId} />
          <TaskList myTaskListId={myTaskListId} />
        </Flex>
      </ClickHandler>
      <ActionButtons />
    </Container>
  )
})

MyTaskList.displayName = 'MyTaskList'
