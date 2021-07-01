import React, { memo } from 'react'
import { Flex, Icon, IconButton } from 'src/components/atoms'
import { TaskSectionName } from './TaskSectionName'

type Props = {
  projectId: string
  onToggle: () => void
  isExpanded: boolean
}

export const Header: React.FC<Props> = memo<Props>((props) => {
  const { onToggle, isExpanded } = props

  return (
    <Flex h="50px" maxW="40%" alignItems="center">
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
