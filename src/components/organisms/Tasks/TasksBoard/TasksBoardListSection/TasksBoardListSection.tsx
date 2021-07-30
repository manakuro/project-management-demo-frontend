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

const TOP = 72 + 40 + 8 + 8 + 36 // Header + List Header + padding + padding + List Section
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
        // _hover={{
        //   borderColor: 'gray.200',
        //   boxShadow: 'sm',
        // }}
        transition={transitions.base()}
      >
        <Header taskSectionId={props.taskSectionId} />
        <Flex
          flexDirection="column"
          overflowY="scroll"
          pb={20}
          position="relative"
          maxH={`calc(100vh - ${TOP}px)`}
          minH={`calc(100vh - ${TOP}px)`}
        >
          {taskIds.length > 0 && (
            <>
              {taskIds.map((id) => (
                <TasksBoardListItem taskId={id} key={id} />
              ))}
              <AddTask taskSectionId={props.taskSectionId} />
            </>
          )}
          {taskIds.length === 0 && (
            <>
              <Flex
                bgGradient="linear(to-b, help.guide.bg, gray.50)"
                borderRadius="md"
                w="full"
                h="calc(100% - 8px)"
                position="absolute"
                top={2}
                left={0}
                pt={2}
                px={2}
              >
                <AddTask taskSectionId={props.taskSectionId} w="full" />
              </Flex>
            </>
          )}
        </Flex>
      </Flex>
      {props.showAddButton && <AddTaskSection />}
    </>
  )
})
TasksBoardListSection.displayName = 'TasksBoardListSection'
