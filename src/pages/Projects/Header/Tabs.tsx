import React, { memo } from 'react'
import { TabList, Tab } from 'src/components/organisms/Tabs'
import { Flex, Heading } from 'src/components/ui/atoms'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { useProject } from 'src/store/entities/project'
import { FavoriteIconButton } from './FavoriteIconButton'
import { MoreActionIconButton } from './MoreActionIconButton'
import { ProjectDetailIconButton } from './ProjectDetailIconButton'

export const Tabs: React.FC = memo(() => {
  const { projectId } = useProjectsProjectId()
  const { project } = useProject(projectId)

  return (
    <Flex ml={4} mt={3} flex={1}>
      <Flex alignItems="flex-start" flexDirection="column">
        <Flex alignItems="center">
          <Heading as="h2" size="md" fontWeight="semibold">
            {project.name}
          </Heading>
          <MoreActionIconButton projectId={projectId} />
          <ProjectDetailIconButton projectId={projectId} />
          <FavoriteIconButton projectId={projectId} />
        </Flex>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>List</Tab>
          <Tab>Board</Tab>
          <Tab isDisabled cursor="auto !important">
            Timeline
          </Tab>
          <Tab>Calendar</Tab>
          <Tab isDisabled cursor="auto !important">
            Dashboard
          </Tab>
          <Tab>Files</Tab>
        </TabList>
      </Flex>
    </Flex>
  )
})
Tabs.displayName = 'Tabs'
