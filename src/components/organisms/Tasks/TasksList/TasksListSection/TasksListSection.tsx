import React, { memo, useCallback, useState } from 'react'
import { Flex, Icon, IconButton, Stack } from 'src/components/atoms'
import { TasksListItem } from 'src/components/organisms/Tasks/TasksList/TasksListItem'
import { useHover } from 'src/hooks/useHover'
import { useMyTask } from 'src/store/app/myTasks'
import { AddTask } from './AddTask'
import { AddTaskButton } from './AddTaskButton'
import { MoreAction } from './MoreAction'
import { TaskSectionName } from './TaskSectionName'

type Props = {
  taskSectionId: string
}

export const TasksListSection: React.FC<Props> = memo<Props>((props) => {
  const { taskIds } = useMyTask(props.taskSectionId)
  const { ref, isHovering } = useHover()
  const [isExpanded, setIsExpanded] = useState(true)

  const handleToggle = useCallback(() => {
    setIsExpanded((s) => !s)
  }, [])

  return (
    <Flex flex={1} flexDirection="column" ref={ref}>
      <Flex h="50px" alignItems="center">
        <IconButton
          aria-label="Task list expand button"
          icon={<Icon icon={isExpanded ? 'chevronDown' : 'chevronRight'} />}
          variant="ghost"
          onClick={handleToggle}
        />
        <TaskSectionName taskSectionId={props.taskSectionId} />
        {isHovering && (
          <Stack direction="row" spacing={1}>
            <AddTaskButton />
            <MoreAction />
          </Stack>
        )}
      </Flex>
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
