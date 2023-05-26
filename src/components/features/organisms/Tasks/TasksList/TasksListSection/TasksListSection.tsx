import React, { memo, useCallback, useState } from 'react'
import { TasksListItem } from 'src/components/features/organisms/Tasks/TasksList/TasksListItem'
import { useTasksTaskIdsByTaskSectionId } from 'src/components/features/organisms/Tasks/hooks'
import { Flex } from 'src/components/ui/atoms'
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
  const { taskIds } = useTasksTaskIdsByTaskSectionId(props.taskSectionId)
  const [isExpanded, setIsExpanded] = useState(true)

  const handleToggle = useCallback(() => {
    setIsExpanded((s) => !s)
  }, [])

  return (
    <>
      <Flex flexDirection="column">
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
Component.displayName = 'Component'
TasksListSection.displayName = 'TasksListSection'
