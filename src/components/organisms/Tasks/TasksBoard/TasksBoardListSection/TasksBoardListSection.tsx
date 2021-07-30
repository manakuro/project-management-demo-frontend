import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { useTaskContext } from 'src/components/organisms'
import { transitions } from 'src/styles'
import { TasksBoardListItem } from '../TasksBoardListItem'
import { AddTask } from './AddTask'
import { AddTaskSection } from './AddTaskSection'
import { Header } from './Header'
import { Provider } from './Provider'

type Props = {
  taskSectionId: string
  showAddButton: boolean
}
export const TasksBoardListSection: React.FC<Props> = memo<Props>((props) => {
  return (
    <Provider taskSectionId={props.taskSectionId}>
      <Component {...props} />
    </Provider>
  )
})

const Component: React.FC<Props> = memo<Props>((props) => {
  const { taskIds } = useTaskContext(props.taskSectionId)

  return (
    <>
      <Flex
        flexDirection="column"
        w="304px"
        maxW="304px"
        h="full"
        px={3}
        py={2}
        ml={2}
        border={1}
        borderStyle="solid"
        borderColor="transparent"
        borderRadius="md"
        _hover={{
          borderColor: 'gray.200',
          boxShadow: 'sm',
        }}
        transition={transitions.base()}
      >
        <Header taskSectionId={props.taskSectionId} />
        <Flex flexDirection="column" overflowY="scroll" maxH="600px">
          {taskIds.map((id) => (
            <TasksBoardListItem taskId={id} key={id} />
          ))}
          <AddTask taskSectionId={props.taskSectionId} />
        </Flex>
      </Flex>
      {props.showAddButton && <AddTaskSection />}
    </>
  )
})
TasksBoardListSection.displayName = 'TasksBoardListSection'
