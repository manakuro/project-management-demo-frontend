import React, { memo } from 'react'
import { useTasksListContext } from 'src/components/features/organisms/Tasks/TasksList/Provider'
import { Flex, Icon, IconButton } from 'src/components/ui/atoms'
import { TaskSectionName } from './TaskSectionName'

type Props = {
  projectId: string
  onToggle: () => void
  isExpanded: boolean
}

export const Header: React.FC<Props> = memo<Props>((props) => {
  const { onToggle, isExpanded } = props
  const { stickyStyle } = useTasksListContext()

  return (
    <Flex
      h="50px"
      maxW="40%"
      alignItems="center"
      pl={6}
      {...stickyStyle}
      zIndex={(stickyStyle.zIndex as number) + 1}
      mt={1}
    >
      <IconButton
        aria-label="Task list expand button"
        icon={<Icon icon={isExpanded ? 'chevronDown' : 'chevronRight'} />}
        variant="ghost"
        onClick={onToggle}
      />
      <TaskSectionName projectId={props.projectId} />
    </Flex>
  )
})
Header.displayName = 'Header'
