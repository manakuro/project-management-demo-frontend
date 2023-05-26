import React, { memo } from 'react'
import { Box } from 'src/components/ui/atoms'
import { useProject } from 'src/store/entities/project'

type Props = {
  projectId: string
}

export const TaskSectionName: React.FC<Props> = memo<Props>((props) => {
  const { project } = useProject(props.projectId)

  return (
    <Box px={2} maxW={80} noOfLines={1} fontWeight="semibold">
      {project.name}
    </Box>
  )
})
TaskSectionName.displayName = 'TaskSectionName'
