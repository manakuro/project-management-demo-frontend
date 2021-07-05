import React, { memo, useCallback, useState } from 'react'
import { Flex } from 'src/components/atoms'
import { useTasksContext } from 'src/components/organisms'
import { TasksListItem } from 'src/components/organisms/Tasks/TasksList/TasksListItem'
import { AddTask } from './AddTask'
import { AddTaskSection } from './AddTaskSection'
import { Header } from './Header'
import { Provider } from './Provider'

type Props = {
  taskSectionId: string
  showAddButton: boolean
  indented?: boolean
}
export const TasksListSection: React.FC<Props> = memo<Props>((props) => {
  return (
    <Provider taskSectionId={props.taskSectionId} indented={props.indented}>
      <Component {...props} />
    </Provider>
  )
})

const Component: React.FC<Props> = memo<Props>((props) => {
  const { useTaskByTaskSection } = useTasksContext()
  const { taskIds } = useTaskByTaskSection(props.taskSectionId)
  const [isExpanded, setIsExpanded] = useState(true)

  const handleToggle = useCallback(() => {
    setIsExpanded((s) => !s)
  }, [])

  return (
    <>
      <Flex flex={1} flexDirection="column">
        <Header
          taskSectionId={props.taskSectionId}
          onToggle={handleToggle}
          isExpanded={isExpanded}
        />
        {isExpanded && (
          <Flex flexDirection="column">
            {taskIds.map((id) => (
              <TasksListItem taskId={id} key={id} />
            ))}
            <AddTask taskSectionId={props.taskSectionId} />
          </Flex>
        )}
      </Flex>
      {props.showAddButton && <AddTaskSection />}
    </>
  )
})
TasksListSection.displayName = 'TasksListSection'
