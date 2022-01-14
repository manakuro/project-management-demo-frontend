import React, { memo } from 'react'
import { FlexProps, Flex } from 'src/components/atoms'
import { useProjectBaseColor } from 'src/store/entities/projectBaseColors'
import { useProject } from 'src/store/entities/projects'

type Props = FlexProps & {
  projectId: string
}

export const ProjectChip: React.FC<Props> = memo<Props>((props) => {
  const { project } = useProject(props.projectId)
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId)

  return (
    <Flex
      borderRadius="full"
      width={10}
      h="6px"
      bg={projectBaseColor.color.color}
    />
  )
})
ProjectChip.displayName = 'ProjectChip'
