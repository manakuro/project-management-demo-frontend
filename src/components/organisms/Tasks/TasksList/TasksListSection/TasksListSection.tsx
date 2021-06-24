import React, { memo, useCallback, useState } from 'react'
import { Flex } from 'src/components/atoms'
import { TasksListItem } from 'src/components/organisms/Tasks/TasksList/TasksListItem'
import { useMyTask } from 'src/store/app/myTasks'
import { AddTask } from './AddTask'
import { Header } from './Header'

type Props = {
  taskSectionId: string
}

export const TasksListSection: React.FC<Props> = memo<Props>((props) => {
  const { taskIds } = useMyTask(props.taskSectionId)
  const [isExpanded, setIsExpanded] = useState(true)

  const handleToggle = useCallback(() => {
    setIsExpanded((s) => !s)
  }, [])

  return (
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
  )
})
TasksListSection.displayName = 'TasksListSection'
