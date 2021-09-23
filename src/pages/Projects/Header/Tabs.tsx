import React, { memo } from 'react'
import { Flex, Heading } from 'src/components/atoms'
import { TabList, Tab } from 'src/components/organisms/Tabs'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { useProject } from 'src/store/entities/projects'
import { FavoriteIconButton } from './FavoriteIconButton'
import { MoreAction } from './MoreAction'
import { ProjectDetailIcon } from './ProjectDetailIcon'

export const Tabs: React.VFC = memo(() => {
  const { projectId } = useProjectsProjectId()
  const { project } = useProject(projectId)

  return (
    <Flex ml={4} mt={3} flex={1}>
      <Flex alignItems="flex-start" flexDirection="column">
        <Flex alignItems="center">
          <Heading as="h2" size="md" fontWeight="semibold">
            {project.name}
          </Heading>
          <MoreAction projectId={projectId} />
          <ProjectDetailIcon projectId={projectId} />
          <FavoriteIconButton projectId={projectId} />
        </Flex>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>List</Tab>
          <Tab>Board</Tab>
          <Tab>Calendar</Tab>
          <Tab>Files</Tab>
        </TabList>
      </Flex>
    </Flex>
  )
})
Tabs.displayName = 'Tabs'
