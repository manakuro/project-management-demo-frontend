import React, { memo } from 'react'
import { Box } from 'src/components/atoms'
import { useProject } from 'src/store/entities/projects'

type Props = {
  projectId: string
}

export const TaskSectionName: React.FC<Props> = memo<Props>((props) => {
  const { project } = useProject(props.projectId)

  return (
    <Box px={2} maxW={80} isTruncated fontWeight="semibold">
      {project.name}
    </Box>
  )
})
TaskSectionName.displayName = 'TaskSectionName'
