import React, { memo } from 'react'
import { Flex, Icon } from 'src/components/atoms'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { useProjectBaseColor } from 'src/store/entities/projectBaseColors'
import { useProject } from 'src/store/entities/projects'
import { findProjectIcon } from 'src/store/entities/projects/projectIcons'

export const ProjectIcon: React.VFC = memo(() => {
  const { projectId } = useProjectsProjectId()
  const { project } = useProject(projectId)
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId)

  return (
    <Flex alignItems="center">
      <Flex
        borderRadius="lg"
        w={12}
        h={12}
        bg={projectBaseColor.color.color}
        color="white"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Icon size="lg" icon={findProjectIcon(project.icon.id).icon} />
      </Flex>
    </Flex>
  )
})
ProjectIcon.displayName = 'ProjectIcon'
