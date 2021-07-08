import React, { memo } from 'react'
import { Flex, Icon, IconButton, Stack } from 'src/components/atoms'
import { useTasksListSectionContext } from 'src/components/organisms/Tasks/TasksList/TasksListSection/Provider'
import { useHover } from 'src/hooks/useHover'
import { AddTaskButton } from './AddTaskButton'
import { MoreAction } from './MoreAction'
import { TaskSectionName } from './TaskSectionName'

type Props = {
  taskSectionId: string
  onToggle: () => void
  isExpanded: boolean
}

export const Header: React.FC<Props> = memo<Props>((props) => {
  const { onToggle, isExpanded } = props
  const { ref, isHovering } = useHover()
  const { sortedStyle } = useTasksListSectionContext()

  return (
    <Flex
      h="50px"
      maxW="40%"
      alignItems="center"
      ref={ref}
      {...sortedStyle}
      px={6}
    >
      <IconButton
        aria-label="Task list expand button"
        icon={<Icon icon={isExpanded ? 'chevronDown' : 'chevronRight'} />}
        variant="ghost"
        onClick={onToggle}
      />
      <TaskSectionName taskSectionId={props.taskSectionId} />
      {isHovering && (
        <Stack direction="row" spacing={1}>
          <AddTaskButton taskSectionId={props.taskSectionId} />
          <MoreAction />
        </Stack>
      )}
    </Flex>
  )
})
Header.displayName = 'Header'
