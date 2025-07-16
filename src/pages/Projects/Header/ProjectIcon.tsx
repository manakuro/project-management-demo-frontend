import type React from 'react'
import { memo } from 'react'
import { Flex, Icon } from 'src/components/ui/atoms'
import type { IconType } from 'src/shared/icons'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { useProject } from 'src/store/entities/project'
import { useProjectBaseColor } from 'src/store/entities/projectBaseColor'
import { useProjectIcon } from 'src/store/entities/projectIcon'

export const ProjectIcon: React.FC = memo(() => {
  const { projectId } = useProjectsProjectId()
  const { project } = useProject(projectId)
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId)
  const { projectIcon } = useProjectIcon(project.projectIconId)

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
        <Icon size="lg" icon={projectIcon.icon.icon as IconType} />
      </Flex>
    </Flex>
  )
})
ProjectIcon.displayName = 'ProjectIcon'
